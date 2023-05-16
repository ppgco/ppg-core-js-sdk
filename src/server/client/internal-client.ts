import {RequestHeaders} from "./interfaces/common";
import {RequestBuilder} from "./request-builder";
import path from "path";

export class InternalClient {
	private readonly _defaultHeaders: RequestHeaders = {
		'content-type': 'application/json',
	};
	
	constructor(
		private readonly endpoint: string,
		private readonly apiKey?: string,
	) {
	}
	
	private createEndpointUrl(urlPath: string) {
		const [proto, endpoint] = this.endpoint.split("://")
		return proto
			.concat("://")
			.concat(
				path.join(
					endpoint,
					urlPath
				)
			);
	}
	
	private makeRequest(
		method: string,
		urlPath: string
	): RequestBuilder<any> {
		const headers: RequestHeaders = Object.assign({}, this._defaultHeaders);
		
		if (this.apiKey) {
			headers['authorization'] = 'token='.concat(this.apiKey);
		}
		
		return new RequestBuilder<any>(this.createEndpointUrl(urlPath))
			.setHeaders(headers)
			.method(method)
	}
	
	public post(urlPath: string) {
		return this.makeRequest('post', urlPath)
	}
}
