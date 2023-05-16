export type CredentialType = "apns_cert" | "apns_token" | "fcm_v1" | "fcm_legacy" | "vapid" | "hms";

export type CredentialId = string;

export interface ProviderCredential {
	type: CredentialType
	payload: Record<string, string>; // TODO: Add interfaces for that
}