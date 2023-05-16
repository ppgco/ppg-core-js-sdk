import { AbstractProvider } from "./providers/abstract-provider";
import { VapidProviderOptions } from "./providers/vapid-provider";
export declare class PpgCoreClientBuilder {
    private _vapidProvider;
    setVapidSupport(options: VapidProviderOptions): this;
    build(): PpgCoreClient;
}
export declare class PpgCoreClient implements AbstractProvider {
    private _provider;
    protected constructor(_provider: AbstractProvider);
    isSubscribed(): Promise<boolean>;
    subscribe(): Promise<import("./providers/subscription").Subscription>;
    getSubscription(): Promise<PushSubscriptionJSON | null>;
    unsubscribe(): Promise<boolean>;
    browserSupportsWebPush(): boolean;
    static builder(): PpgCoreClientBuilder;
}
