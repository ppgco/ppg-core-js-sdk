import { AbstractProvider } from "./abstract-provider";
import { Subscription } from "./subscription";
export declare class UnsupportedProvider extends AbstractProvider {
    browserSupportsWebPush(): boolean;
    isSubscribed(): Promise<boolean>;
    subscribe(): Promise<Subscription>;
    getSubscription(): Promise<null | PushSubscriptionJSON>;
    unsubscribe(): Promise<boolean>;
}
