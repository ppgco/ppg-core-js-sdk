import {AbstractProvider} from "./abstract-provider";
import {Subscription} from "./subscription";

export class UnsupportedProvider extends AbstractProvider {
  public override browserSupportsWebPush() {
    return false;
  }

  public async isSubscribed(): Promise<boolean> {
    throw new Error('browser unsupported')
  }

  public async subscribe(): Promise<Subscription> {
    throw new Error('browser unsupported')
  }

  public getSubscription(): Promise<null | PushSubscriptionJSON> {
    throw new Error('browser unsupported')
  }

  public async unsubscribe(): Promise<boolean> {
    throw new Error('browser unsupported')
  }
}