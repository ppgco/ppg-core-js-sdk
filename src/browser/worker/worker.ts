import {assertUnreachable} from "../../utils/assertUnreachable";

interface PpgCoreWorkerOptions {
	endpoint?: string;
	onSubscriptionChange: OnSubscriptionChangeConfig;
	onExternalData?: (externalData: string) => void;
}

interface OnSubscriptionChangeEvent extends Event {
	newSubscription: PushSubscription,
	oldSubscription: PushSubscription
}

export interface PpgCoreNotificationEvent {
	type: "clicked" | "closed" | "delivered"
	payload: {
		contextId: string;
		foreignId: string;
		messageId: string;
		action?: string;
	}
}

export interface PpgCoreSubscriptionChangeEvent {
	type: "change"
	payload: {
		oldSubscription: PushSubscriptionJSON;
		newSubscription: PushSubscriptionJSON
	}
}

export interface OnSubscriptionChangeConfig {
	endpoint: string;
	headers: Record<string, string>
}

export class Worker {
	
	constructor(
		private readonly workerScope: ServiceWorkerGlobalScope,
		private readonly options: PpgCoreWorkerOptions
	) {
		
		this.options.endpoint = this.options.endpoint || "https://api-core.pushpushgo.com/v1";

		this.options.onSubscriptionChange = {
			endpoint: this.options.onSubscriptionChange.endpoint || assertUnreachable("options.onSubscriptionChangeConfig.endpoint is required"),
			headers: this.options.onSubscriptionChange.headers || {}
		}
		
		this.registerInstallEventHandler();
		this.registerActivateEventHandler();
		this.registerPushEventHandler();
		this.registerNotificationClickEventHandler();
		this.registerNotificationCloseEventHandler();
		this.registerSyncEventHandler();
		this.registerPushSubscriptionChangeEventHandler();
	}
	
	private async clearBadge() {
		if ('clearAppBadge' in self.navigator) {
		  	try {
				await (self.navigator as any).clearAppBadge();
			} catch (error) {
				console.error('Failed to clear app badge:', error);
	    	}
		}
	}
	
	private async setBadge(count: number) {
		if ('setAppBadge' in self.navigator) {
			try {
				await (self.navigator as any).setAppBadge(count);
			} catch (error) {
				console.error('Failed to set app badge:', error);
			}
		}
	}

	private async processBadge(count: number) {
		return count === 0 ? this.clearBadge() : this.setBadge(count);
	}

	private async sendNotificationEvent(event: PpgCoreNotificationEvent) {
		console.log("send notification with event: ", event);
		await fetch(`${this.options.endpoint}/context/${event.payload.contextId}/events/${event.type}`, {
			method: "post",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(event.payload)
		})
	}
	
	private registerPushSubscriptionChangeEventHandler() {
		this.workerScope.addEventListener('pushsubscriptionchange', async (event) => {
			const subscriptionEvent = event as OnSubscriptionChangeEvent;
			const oldSubscription = subscriptionEvent.oldSubscription.toJSON();
			const newSubscription = subscriptionEvent.newSubscription.toJSON();

			await fetch(this.options.onSubscriptionChange.endpoint, {
				method: 'post',
				headers: {
					...this.options.onSubscriptionChange.headers,
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					type: "change",
					payload: {
						oldSubscription,
						newSubscription
					}
				} as PpgCoreSubscriptionChangeEvent)
			})
		})
	}
	
	private registerSyncEventHandler() {
		/**
		 * Here we can sync "bad delivers" with out api
		 */
	}
	
	private registerActivateEventHandler() {
		this.workerScope.addEventListener('activate', (event: ExtendableEvent) => {
			/**
			 * Wait until all clients will be controlled by this worker
			 */
			event.waitUntil(this.workerScope.clients.claim());
		});
	}
	
	private registerInstallEventHandler() {
		this.workerScope.addEventListener('install', () =>
			/**
			 * Allows the current service worker registration to progress from waiting
			 * to active state while service worker clients are using it.
			 */
			this.workerScope.skipWaiting()
		);
	}
	
	private registerPushEventHandler() {
		this.workerScope.addEventListener('push', (event: PushEvent) => {
			if (!event.data) {
				console.warn('event.data is null, omit')
				return;
			}
			
			const parsedData = event.data.json();

			if (parsedData.data._silent) {
				console.warn('event.data._silent is not null, omit');
				return event.waitUntil(Promise.all([
					this.sendNotificationEvent({
						type: "delivered",
						payload: {
							contextId: parsedData.data.contextId,
							messageId: parsedData.data.messageId,
							foreignId: parsedData.data.foreignId,
						}
					})
				]));
			}

			if (typeof parsedData.data.badge === "number") {
				console.warn('event.data.badge is not null, go to process badge if supported');
				this.processBadge(parsedData.data.badge);
			}

			if (typeof parsedData.data.externalData === "string") {
				try {
					if (typeof this.options.onExternalData === "function") {
						this.options.onExternalData(parsedData.data.externalData)
					}
				} catch(error) {
					console.error(error);
				}
			}

			event.waitUntil(
				Promise.all([
					this.workerScope.registration.showNotification(parsedData.title, parsedData),
					this.sendNotificationEvent({
						type: "delivered",
						payload: {
							contextId: parsedData.data.contextId,
							messageId: parsedData.data.messageId,
							foreignId: parsedData.data.foreignId,
						}
					})
				])
			)
		});
	}
	
	private registerNotificationClickEventHandler() {
		this.workerScope.addEventListener('notificationclick', (event: NotificationEvent) => {
			event.notification.close();
			
			const url = event.notification.data.actionsMap[event.action || 'default'];
			
			event.waitUntil(
				Promise.all([
					this.sendNotificationEvent({
						type: "clicked",
						payload: {
							contextId: event.notification.data.contextId,
							messageId: event.notification.data.messageId,
							foreignId: event.notification.data.foreignId,
							action: event.action,
						}
					}),
					this.workerScope.clients
						.matchAll({type: 'window', includeUncontrolled: true})
						.then((windowClients) => {
							if (!url) {
								console.warn('url is not provided for this action, omit');
								const firstClient = windowClients.at(0)
								
								if (firstClient) {
									console.warn('do not match any active client to focus, omit');
									return firstClient.focus();
								}
								
								return;
							}
							
							// Prevent to open same url window, just focus on that window
							for (const client of windowClients) {
								if (client.url === url && 'focus' in client) {
									return client.focus();
								}
							}
							
							return this.workerScope.clients.openWindow(url);
						}),
				])
			);
		})
	}
	
	private registerNotificationCloseEventHandler() {
		this.workerScope.addEventListener('notificationclose', (event: NotificationEvent) => {
			event.waitUntil(
				this.sendNotificationEvent({
					type: "closed",
					payload: {
						contextId: event.notification.data.contextId,
						messageId: event.notification.data.messageId,
						foreignId: event.notification.data.foreignId,
					}
				})
			)
		});
	}
}