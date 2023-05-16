export type ForeignId = {
    readonly foreignId?: string;
};
export interface WebPushReceiver {
    p256dh: string;
    auth: string;
    endpoint: string;
}
export interface MobileReceiver {
    token: string;
}
export interface WithCredentialId {
    credentialId: string;
}
type MobileToken = string;
type ApnsWebsitePushId = string;
type ApnsAppBundleId = string;
type FcmProjectId = string;
type HmsAppId = string;
type VapidPublicKey = string;
type VapidP256Dh = string;
type VapidAuth = string;
type VapidEndpoint = string;
export type SubscriptionType = "fcm/android" | "hms/android" | "vapid" | "apns/ios" | "apns/safari";
interface BaseSubscription {
    type: SubscriptionType;
    project?: HmsAppId;
    publicKey?: VapidPublicKey;
    appBundleId?: ApnsAppBundleId;
    websitePushId?: ApnsWebsitePushId;
    foreignId: string;
}
interface FcmSubscription extends BaseSubscription {
    type: "fcm/android";
    token: MobileToken;
    project: FcmProjectId;
}
interface HmsSubscription extends BaseSubscription {
    type: "hms/android";
    token: MobileToken;
    project: HmsAppId;
}
interface VapidSubscription extends BaseSubscription {
    type: "vapid";
    publicKey: VapidPublicKey;
    p256dh: VapidP256Dh;
    auth: VapidAuth;
    endpoint: VapidEndpoint;
}
interface ApnsIosSubscription extends BaseSubscription {
    type: "apns/ios";
    token: MobileToken;
    appBundleId: ApnsAppBundleId;
}
interface ApnsSafariSubscription extends BaseSubscription {
    type: "apns/safari";
    token: MobileToken;
    websitePushId: ApnsWebsitePushId;
}
export type Subscription = ApnsIosSubscription | ApnsSafariSubscription | FcmSubscription | HmsSubscription | VapidSubscription;
export type ReceiverWebPush = WithCredentialId & ForeignId & WebPushReceiver;
export type ReceiverMobile = WithCredentialId & ForeignId & MobileReceiver;
export type Receiver = ReceiverWebPush | ReceiverMobile;
export {};
