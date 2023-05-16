import { RequestBuilder } from "./request-builder";
export declare class InternalClient {
    private readonly endpoint;
    private readonly apiKey?;
    private readonly _defaultHeaders;
    constructor(endpoint: string, apiKey?: string | undefined);
    private createEndpointUrl;
    private makeRequest;
    post(urlPath: string): RequestBuilder<any>;
}
