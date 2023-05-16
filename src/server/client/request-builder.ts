import {RequestHeaders} from "./interfaces/common";
import fetch, {Headers} from "node-fetch";

export class RequestBuilder<T extends object> {
	private _headers: RequestHeaders = {};
	private _body?: T;
	private _method: string = 'get';
	
	constructor(
		private readonly _url: string,
	) {
	
	}
	
	public body<NT extends object>(
		this: RequestBuilder<NT>,
		body: NT
	): RequestBuilder<NT> {
		this._body = body;
		return this;
	}
	
	public setHeaders(headers: RequestHeaders): this {
		this._headers = headers
		return this;
	}
	
	public extendHeaders(headers: RequestHeaders): this {
		Object.assign(this._headers, headers);
		return this;
	}
	
	public method(method: string): this {
		this._method = method;
		return this;
	}
	
	public async execute<JsonBody extends object>(): Promise<JsonBody> {
		const res = await fetch(this._url, {
			headers: new Headers(this._headers),
			body: JSON.stringify(this._body),
			method: this._method,
		});
		
		if (!res.ok) {
			throw new Error(await res.text());
		}
		
		return await res.json();
	}
}