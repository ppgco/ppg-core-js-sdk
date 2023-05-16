import { RequestHeaders } from "./interfaces/common";
export declare class RequestBuilder<T extends object> {
    private readonly _url;
    private _headers;
    private _body?;
    private _method;
    constructor(_url: string);
    body<NT extends object>(this: RequestBuilder<NT>, body: NT): RequestBuilder<NT>;
    setHeaders(headers: RequestHeaders): this;
    extendHeaders(headers: RequestHeaders): this;
    method(method: string): this;
    execute<JsonBody extends object>(): Promise<JsonBody>;
}
