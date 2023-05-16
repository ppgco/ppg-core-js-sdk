import {InternalClient} from "./internal-client";
import {Bucket} from "./bucket";
import {Receiver} from "./interfaces/receiver";
import {MessageResultDto} from "./interfaces/message";

export class Context {
	
	constructor(
		private readonly _contextId: string,
		private readonly _internalClient: InternalClient,
		private readonly _bucket: Bucket,
	) {
	
	}
	
	async sendMessages(receivers: Receiver[]): Promise<MessageResultDto[]> {
		return await this
			._internalClient
			.post(`/bucket/${this._bucket.getId()}/context/${this._contextId}/send`)
			.body({
				receivers
			})
			.execute<MessageResultDto[]>()
	}
}