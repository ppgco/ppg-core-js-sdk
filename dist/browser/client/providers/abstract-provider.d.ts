import type { Subscription } from "./subscription";
export declare abstract class AbstractProvider {
    abstract browserSupportsWebPush(): boolean;
    abstract isSubscribed(): Promise<boolean>;
    abstract subscribe(): Promise<Subscription>;
    abstract getSubscription(): Promise<null | PushSubscriptionJSON>;
    abstract unsubscribe(): Promise<boolean>;
}
