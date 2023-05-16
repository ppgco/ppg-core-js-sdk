import type {Subscription} from "./subscription";

export abstract class AbstractProvider {
  public abstract browserSupportsWebPush(): boolean;

  public abstract isSubscribed(): Promise<boolean>;

  public abstract subscribe(): Promise<Subscription>;

  public abstract getSubscription(): Promise<null | PushSubscriptionJSON>;

  public abstract unsubscribe(): Promise<boolean>;
}