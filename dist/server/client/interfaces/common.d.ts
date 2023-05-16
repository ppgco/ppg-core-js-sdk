import { CredentialId } from "./credentials";
export type Url = string;
export type ProviderCredentialKey = string;
export type RequestHeaders = {
    [key: string]: string;
};
export type ProviderCredentialsMap = Map<ProviderCredentialKey, CredentialId>;
