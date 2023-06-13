import { Receiver, Subscription, SubscriptionType } from "./interfaces/receiver";
import { MessageResultDto } from "./interfaces/message";
import { DataContextMetadata, RawContextMetadata, SilentContextMetadata } from "./interfaces/metadata";
import { InternalClient } from "./internal-client";
import { Context } from "./context";
import { ProviderCredentialsMap } from "./interfaces/common";
export declare class Bucket {
    private readonly _bucketId;
    private readonly _internalClient;
    private readonly _providers;
    static createCredentialKey(type: SubscriptionType, ident?: string): string;
    constructor(_bucketId: string, _internalClient: InternalClient, _providers: ProviderCredentialsMap);
    getId(): string;
    /**
     * All SDK generated subscriptions
     * @param subscription SDK Generated Subscription JSON
     * @returns Valid to API receiver format
     */
    createReceiver(subscription: Subscription): Receiver;
    sendRawMessage(receiver: Receiver, contextMetadata: RawContextMetadata): Promise<MessageResultDto>;
    sendMessage(receiver: Receiver, contextMetadata: DataContextMetadata): Promise<MessageResultDto>;
    sendSilentMessage(receiver: Receiver, contextMetadata: SilentContextMetadata): Promise<MessageResultDto>;
    createRawContext(context: RawContextMetadata): Promise<Context>;
    createSilentContext(context: SilentContextMetadata): Promise<Context>;
    createContext(context: DataContextMetadata): Promise<Context>;
}
