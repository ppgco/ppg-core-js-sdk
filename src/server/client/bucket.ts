import { Receiver, Subscription, SubscriptionType } from "./interfaces/receiver";
import { MessageResultDto } from "./interfaces/message";
import { DataContextMetadata, RawContextMetadata, SilentContextMetadata } from "./interfaces/metadata";
import { InternalClient } from "./internal-client";
import { Context } from "./context";
import { ProviderCredentialsMap } from "./interfaces/common";

export class Bucket {

	static createCredentialKey(type: SubscriptionType, ident?: string) {
		if (!ident) {
			throw new Error('Identificator for credential for type should exists');
		}
		return [type, ident].join('.');
	}

	constructor(
		private readonly _bucketId: string,
		private readonly _internalClient: InternalClient,
		private readonly _providers: ProviderCredentialsMap,
	) {

	}

	getId(): string {
		return this._bucketId;
	}

	/**
	 * All SDK generated subscriptions
	 * @param subscription SDK Generated Subscription JSON
	 * @returns Valid to API receiver format
	 */
	public createReceiver(subscription: Subscription): Receiver {
		const providerIdentity = subscription.websitePushId || subscription.appBundleId || subscription.publicKey || subscription.project
		const credentialId = this._providers.get(Bucket.createCredentialKey(subscription.type, providerIdentity));

		if (!credentialId) {
			throw new Error(`Cannot create receiver - provider credentials are not configured for ${subscription.type}`);
		}
		
		return {
			...subscription,
			credentialId
		} as Receiver
	}


	async sendRawMessage(receiver: Receiver, contextMetadata: RawContextMetadata): Promise<MessageResultDto> {
		return await this._internalClient
			.post(`/bucket/${this._bucketId}/send/raw`)
			.body({ receiver, metadata: contextMetadata })
			.execute<any>();
	}

	async sendMessage(receiver: Receiver, contextMetadata: DataContextMetadata): Promise<MessageResultDto> {
		return await this._internalClient
			.post(`/bucket/${this._bucketId}/send`)
			.body({ receiver, metadata: contextMetadata })
			.execute<any>();
	}
	
	async sendSilentMessage(receiver: Receiver, contextMetadata: SilentContextMetadata): Promise<MessageResultDto> {
		return await this._internalClient
			.post(`/bucket/${this._bucketId}/send/silent`)
			.body({ receiver, metadata: contextMetadata })
			.execute<any>();
	}

	async createRawContext(context: RawContextMetadata): Promise<Context> {
		const result = await this._internalClient
			.post(`/bucket/${this._bucketId}/context/raw`)
			.body(context)
			.execute<any>();

		return new Context(result.contextId, this._internalClient, this);
	}


	async createSilentContext(context: SilentContextMetadata): Promise<Context> {
		const result = await this._internalClient
			.post(`/bucket/${this._bucketId}/context/silent`)
			.body(context)
			.execute<any>();

		return new Context(result.contextId, this._internalClient, this);
	}


	async createContext(context: DataContextMetadata): Promise<Context> {
		const result = await this._internalClient
			.post(`/bucket/${this._bucketId}/context/data`)
			.body(context)
			.execute<any>();

		return new Context(result.contextId, this._internalClient, this);
	}
}