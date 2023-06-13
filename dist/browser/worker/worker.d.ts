interface PpgCoreWorkerOptions {
    endpoint?: string;
    onSubscriptionChange: OnSubscriptionChangeConfig;
    onExternalData?: (externalData: string) => void;
}
export interface PpgCoreNotificationEvent {
    type: "clicked" | "closed" | "delivered";
    payload: {
        contextId: string;
        foreignId: string;
        messageId: string;
        action?: string;
    };
}
export interface PpgCoreSubscriptionChangeEvent {
    type: "change";
    payload: {
        oldSubscription: PushSubscriptionJSON;
        newSubscription: PushSubscriptionJSON;
    };
}
export interface OnSubscriptionChangeConfig {
    endpoint: string;
    headers: Record<string, string>;
}
export declare class Worker {
    private readonly workerScope;
    private readonly options;
    constructor(workerScope: ServiceWorkerGlobalScope, options: PpgCoreWorkerOptions);
    private clearBadge;
    private setBadge;
    private processBadge;
    private sendNotificationEvent;
    private registerPushSubscriptionChangeEventHandler;
    private registerSyncEventHandler;
    private registerActivateEventHandler;
    private registerInstallEventHandler;
    private registerPushEventHandler;
    private registerNotificationClickEventHandler;
    private registerNotificationCloseEventHandler;
}
export {};
