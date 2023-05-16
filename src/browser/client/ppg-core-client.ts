import {AbstractProvider} from "./providers/abstract-provider";
import {assert} from "../../utils/assert";
import {VapidProvider, VapidProviderOptions} from "./providers/vapid-provider";
import {UnsupportedProvider} from "./providers/unsupported-provider";

export class PpgCoreClientBuilder {
  private _vapidProvider: VapidProvider | null = null;

  setVapidSupport(options: VapidProviderOptions) {
    this._vapidProvider = new VapidProvider(options);
    return this;
  }

  build(): PpgCoreClient {
    assert(this._vapidProvider !== null, 'at least vapid provider must be configured');
    return new PublicPpgCoreClient(this._vapidProvider || new UnsupportedProvider());
  }
}

export class PpgCoreClient implements AbstractProvider {
  protected constructor(
    private _provider: AbstractProvider,
  ) {
  }

  public isSubscribed() {
    return this._provider.isSubscribed()
  }

  public subscribe() {
    return this._provider.subscribe()
  }

  public getSubscription() {
    return this._provider.getSubscription()
  }

  public unsubscribe() {
    return this._provider.unsubscribe()
  }

  public browserSupportsWebPush(): boolean {
    return this._provider.browserSupportsWebPush();
  }

  public static builder() {
    return new PpgCoreClientBuilder();
  }
}

class PublicPpgCoreClient extends PpgCoreClient {
  public constructor(provider: AbstractProvider) {
    super(provider);
  }
}
