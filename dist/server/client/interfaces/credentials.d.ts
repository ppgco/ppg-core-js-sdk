export type CredentialType = "apns_cert" | "apns_token" | "fcm_v1" | "fcm_legacy" | "vapid" | "hms";
export type CredentialId = string;
export type ProviderCredential = VapidCredentialConfig | HmsCredentialConfig | FcmLegacyCredentialConfig | ApnsTokenCredentialConfig | ApnsCertificateCredentialConfig | FcmV1CredentialConfig;
export interface VapidCredentialConfig {
    type: "vapid";
    payload: {
        privateKey: string;
        publicKey: string;
    };
}
export interface HmsCredentialConfig {
    type: "hms";
    payload: {
        appId: string;
        appSecret: string;
        pushUrl: string;
        authUrl: string;
    };
}
export interface FcmV1CredentialConfig {
    type: "fcm_v1";
    payload: {
        type: string;
        project_id: string;
        private_key_id: string;
        private_key: string;
        client_email: string;
        client_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_x509_cert_url: string;
    };
}
export interface FcmLegacyCredentialConfig {
    type: "fcm_legacy";
    payload: {
        senderId: string;
        authorizationKey: string;
    };
}
export interface ApnsTokenCredentialConfig {
    type: "apns_token";
    payload: {
        teamId: string;
        keyId: string;
        key: string;
        production: boolean;
        /**
        * @description One of depends what you want authorize mobile app or safari
        */
        appBundleId?: string;
        /**
        * @description One of depends what you want authorize mobile app or safari
        */
        websitePushId?: string;
    };
}
export interface ApnsCertificateCredentialConfig {
    type: "apns_cert";
    payload: {
        /**
         * @description .p12 file base64 encoded
         */
        p12: string;
        passphrase: string;
        production: boolean;
        /**
        * @description One of depends what you want authorize mobile app or safari
        */
        appBundleId?: string;
        /**
        * @description One of depends what you want authorize mobile app or safari
        */
        websitePushId?: string;
    };
}
