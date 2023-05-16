import { AbstractProvider } from "./abstract-provider";
import { Subscription, VapidSubscription } from "./subscription";
export interface VapidProviderOptions {
    scope: string;
    swPath: string;
    applicationServerKey: string;
    userVisibleOnly?: boolean;
}
export declare class VapidProvider extends AbstractProvider {
    private readonly options;
    constructor(options: VapidProviderOptions);
    browserSupportsWebPush(): boolean;
    private internalGetSubscription;
    isSubscribed(): Promise<boolean>;
    getSubscription(): Promise<null | VapidSubscription>;
    subscribe(): Promise<Subscription>;
    unsubscribe(): Promise<boolean>;
}
