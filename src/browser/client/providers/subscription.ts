export interface SafariLegacySubscription {
  type: "apns/safari";
  token: string;
  websitePushId: string;
}

export interface VapidSubscription {
  type: "vapid";
  publicKey: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  expirationTime: EpochTimeStamp | null;
}

export type Subscription = SafariLegacySubscription | VapidSubscription;
