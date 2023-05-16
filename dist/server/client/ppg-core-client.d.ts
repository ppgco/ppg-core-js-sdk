import { ProviderCredential } from "./interfaces/credentials";
import { Url } from "./interfaces/common";
import { Bucket } from "./bucket";
type ApiKey = string;
interface ClientConfig {
    endpoint: Url;
    apiKey?: ApiKey;
}
interface HttpCallbackConfig {
    url: Url;
    headers: Record<string, string>;
}
export declare class PpgCoreClient {
    private static PROVIDERS_MAP;
    private readonly _internalClient;
    constructor(config: ClientConfig);
    createBucket(providers: ProviderCredential[], httpCallbackConfig?: HttpCallbackConfig): Promise<Bucket>;
    /**
     * Resolve for cache identity of each "provider credential"
     */
    private resolveIdentityDataFromCredentialType;
}
export {};
