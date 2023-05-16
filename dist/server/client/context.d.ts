import { InternalClient } from "./internal-client";
import { Bucket } from "./bucket";
import { Receiver } from "./interfaces/receiver";
import { MessageResultDto } from "./interfaces/message";
export declare class Context {
    private readonly _contextId;
    private readonly _internalClient;
    private readonly _bucket;
    constructor(_contextId: string, _internalClient: InternalClient, _bucket: Bucket);
    sendMessages(receivers: Receiver[]): Promise<MessageResultDto[]>;
}
