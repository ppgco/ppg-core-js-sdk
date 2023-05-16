import {AbstractProvider} from "./abstract-provider";
import {Subscription, VapidSubscription} from "./subscription";
import {assert} from "../../../utils/assert";

export interface VapidProviderOptions {
  scope: string;
  swPath: string;
  applicationServerKey: string;
  userVisibleOnly?: boolean;
}

function nonNullValue<V>(val: V | null | undefined, msg?: string): V {
  if (val === null || val === undefined) {
    throw new Error(msg || "expected non null value")
  }

  return val
}

export class VapidProvider extends AbstractProvider {
  constructor(
    private readonly options: VapidProviderOptions
  ) {
    super();
    assert(options.scope, 'scope is required');
    assert(options.swPath, 'swPath is required');
    assert(options.applicationServerKey, 'applicationServerKey is required');
  }

  public override browserSupportsWebPush() {
    return (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      'Notification' in window &&
      'fetch' in window &&
      ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
      PushSubscription.prototype.hasOwnProperty('getKey')
    );
  }

  private async internalGetSubscription(): Promise<PushSubscription | null> {
    const worker = await navigator.serviceWorker.getRegistration(this.options.scope);

    if (!worker) {
      return null;
    }

    await navigator.serviceWorker.ready;

    return await worker.pushManager.getSubscription();
  }

  public async isSubscribed(): Promise<boolean> {
    return null !== await this.getSubscription();
  }

  public async getSubscription(): Promise<null | VapidSubscription> {
    const subscription = await this.internalGetSubscription()
    if (!subscription) {
      return null;
    }

    const s = subscription.toJSON();

    return {
      type: "vapid",
      p256dh: nonNullValue(s.keys?.p256dh),
      auth: nonNullValue(s.keys?.auth),
      endpoint: nonNullValue(s.endpoint),
      publicKey: nonNullValue(this.options.applicationServerKey),
      expirationTime: s.expirationTime || null
    };
  }

  public async subscribe(): Promise<Subscription> {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    if (Notification.permission !== 'granted') {
      // todo: add errors and strict error codes ErrorCodes.PERMISSION_NOT_GRANTED
      throw new Error('permission not granted');
    }

    const registration = await navigator.serviceWorker.register(this.options.swPath, {
      scope: this.options.scope,
      // Note: when we need to change this params, add new VapidClassicProvider instead of adding options
      type: "module",
      updateViaCache: "all"
    });

    await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: typeof this.options.userVisibleOnly === 'boolean' ? this.options.userVisibleOnly : true,
      applicationServerKey: this.options.applicationServerKey
    });

    const s = subscription.toJSON();

    return {
      type: "vapid",
      p256dh: nonNullValue(s.keys?.p256dh),
      auth: nonNullValue(s.keys?.auth),
      endpoint: nonNullValue(s.endpoint),
      publicKey: nonNullValue(this.options.applicationServerKey),
      expirationTime: s.expirationTime || null
    };
  }

  public async unsubscribe(): Promise<boolean> {
    const subscription = await this.internalGetSubscription();

    if (!subscription) {
      return true;
    }

    return subscription.unsubscribe();
  }
}
