import { CredentialType, ProviderCredential } from "./interfaces/credentials";
import { ProviderCredentialsMap, Url } from "./interfaces/common";
import { Bucket } from "./bucket";
import { InternalClient } from "./internal-client";
import { SubscriptionType } from "./interfaces/receiver";

type ApiKey = string;

interface ClientConfig {
	endpoint: Url;
	apiKey?: ApiKey;
}

interface HttpCallbackConfig {
	url: Url;
	headers: Record<string, string>;
}

export class PpgCoreClient {

	private static PROVIDERS_MAP: Record<CredentialType, SubscriptionType[]> = {
		apns_cert: ["apns/safari", "apns/ios"],
		apns_token: ["apns/safari", "apns/ios"],
		fcm_legacy: ["fcm/android"],
		fcm_v1: ["fcm/android"],
		hms: ["hms/android"],
		vapid: ["vapid"],
	}

	private readonly _internalClient: InternalClient;

	constructor(config: ClientConfig) {
		this._internalClient = new InternalClient(config.endpoint, config.apiKey);
	}

	async createBucket(
		providers: ProviderCredential[],
		httpCallbackConfig?: HttpCallbackConfig,
	): Promise<Bucket> {

		const result = await this._internalClient
			.post('/bucket')
			.body({
				providerCredentials: providers,
				callbackConfig: httpCallbackConfig ? { type: "http", payload: httpCallbackConfig } : { type: "none" }
			})
			.execute<any>()

		const providerCredentialsMap: ProviderCredentialsMap = new Map();

		for (let credentialIndex in result.credentials) {
			const credential = result.credentials[credentialIndex];
			const sourceCredential = providers[credentialIndex as unknown as number];

			if (!sourceCredential) {
				throw new Error("Cannot match source credential of provider with results");
			}

			for (let subType of PpgCoreClient.PROVIDERS_MAP[sourceCredential.type]) {
				for (let identity of this.resolveIdentityDataFromCredentialType(sourceCredential)) {
					providerCredentialsMap.set(
						Bucket.createCredentialKey(subType, identity),
						credential.id
					)
				}
			}
		}

		return new Bucket(result.bucketId, this._internalClient, providerCredentialsMap)
	}


	/**
	 * Resolve for cache identity of each "provider credential"
	 */
	private resolveIdentityDataFromCredentialType(pc: ProviderCredential): string[] {
		switch(pc.type) {
			case "apns_cert":
			case "apns_token":
				return [pc.payload.appBundleId, pc.payload.websitePushId].filter(i => i)
			case "vapid":
				return [pc.payload.publicKey]
			case "fcm_legacy":
				return [pc.payload.senderId]
			case "fcm_v1":
				return [pc.payload.project_id]
			case "hms":
				return [pc.payload.appId]	
		}
	}
}