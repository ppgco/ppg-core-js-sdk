# PushPushGo Core SDK for JavaScript / TypeScript

WIP - do not use 

[![npmjs version](https://img.shields.io/npm/v/@pushpushgo/core-sdk-js?style=flat-square)](https://www.npmjs.com/package/@pushpushgo/core-sdk-js)
![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/ppgco/ppg-core-js-sdk/publish.yml?style=flat-square)
![GitHub tag (latest)](https://img.shields.io/github/v/tag/ppgco/ppg-core-js-sdk?style=flat-square)
[![Discord](https://img.shields.io/discord/1108358192339095662?color=%237289DA&label=Discord&style=flat-square)](https://discord.gg/NVpUWvreZa)

This is a library for PushPushGo Core - can be used for both Browser / Client side.

## Product Info

PushPushGo Core* is a building block for push notifications:
 - sender for push notifications - we handle batch requests, aggregate feedback events and inform your webhook
 - images storage & traffic - we handle, crop and serve your push images
 - fast implementation - we cover Android, iOS, Web with push notifications support
 - you own your database and credentials - no vendor lock-in - we provide infrastructure, sdk & support
 - simple API - we provide one API for all providers

Contact: support+core@pushpushgo.com or [Discord](https://discord.gg/NVpUWvreZa)

<sub>PushPushGo Core is not the same as PushPushGo product - if you are looking for [PushPushGo - Push Notifications Management Platform](https://pushpushgo.com)</sub>

## How it works

IMAGE HERE

When you send request to our API to send message, we prepare images and then connect to different providers. 

When message is delieverd to the device and interacts with user, we collect events and pass them to our API.

After a short time you will recieve package with events on your webhook:

```json
{
    "messages": [
        {
            "messageId": "8e3075f1-6b21-425a-bb4f-eeaf0eac93a2",
            "foreignId": "my_id",
            "result": {
                "kind": "sent"
            },
            "ts": 1685009020243
        },
        {
            "messageId": "8e3075f1-6b21-425a-bb4f-eeaf0eac93a2",
            "foreignId": "my_id",
            "result": {
                "kind": "delivered"
            },
            "ts": 1685009020564
        }
    ]
}
```

Using that data you can calculate statistics or do some of your business logic.

# SDK

To use this SDK you need to have account in PushPushGo Core! and token to authorize your requests.

This package contains two modules "client" and "server".

ClientSDK is for requesting push notifications.

ServerSDK is for sending push notifications via PushPushGo Core API [Swagger](https://linkto.swagger.pushushgo.com)


## Client SDK:
 - Service Worker implementation for Push Notifications
 - Client for registering Service Worker and manage Subscription (Receiver)

## Server SDK:
Definitions of vocabulary:

 - Bucket - it's a configuration (credentials to providers) - once created can be used 24 hours with it's reference. We implement buckets because of traffic and performance. Once you send to us credentials to providers you can reuse this for multiple "campaigns".

 - Context - it's a configuration of content and behaviour of notification. It can also be reusable (in case when you want to send "campaign" to multiple receivers)

 - Receiver - it's a "subscription" that you get from our sdk.

Server SDK covers:
 - Bucket builder
 - Context builder
 - Send Data / Silent / Transactional messages

### How to install?

Server and client version is in one package and available via esm module. Module can be used on browser and server side. 

```bash
$ yarn add @pushpushgo/core-sdk-js
```

### How to use as modules in backend?
```typescript
import { Worker } from "@pushpushgo/core-sdk-js/browser/worker";
import { PpgCoreClient} from "@pushpushgo/core-sdk-js/server/client";
```

Full example how to send notifications in directory [server sender example](/examples/sender/)

### How to use as modules in browser via jsdelivr?
```typescript
import { PpgCoreClient } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/client/index.js"
import { Worker } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/worker/index.js"
```

#### Server client

Server client may be used to create bucket, context, and send notifications

```js
import { PpgCoreClient } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/client/index.js"

// Initialize client
const client = new PpgCoreClient({
  // Optional field with endpoint to our service default fallback to https://api-core.pushpushgo.com/v1 use only when you want to override this param
  endpoint: "",
  // Api key for auth your account, to caim a production API key please contact with us (via discord, email)
  apiKey: ""
});
```

Client instance can create bucket. 
Bucket contains all provider configurations that you want to use during sending session
```js
const bucket = await client.createBucket({
    // You can declare multiple providers for one session
    providers: [
        {
            // Provider type
            type: "vapid" | "hms" | "fcm_v1" | "fcm_legacy" | "apns_token" | "apns_cert"
            // Here please define providers credentials, available providers you can see in table below
            payload: {}
        },
        {
            ...
        }
    ],
    // Optional - This field declare a endpoint that will receive all events gathered from our SDK clients (ios, android, js, flutter) and send aggregated bulks every 1000k or 60 seconds.
    httpCallbackConfig: {
        url: "https://...",
	    headers: {}
    },
})
```

Available providers:

#### vapid payload

```json
{
    "type": "vapid",
    "payload": {
        // You previously generated vapid keys
        "privateKey": "",
        "publicKey": "",
    }
}
```

#### hms 

```json
{
    "type": "hms",
    "payload": {
        // Your appId and appSecret from developer.huawei.com
        "appId": "",
        "appSecret": "",
        "pushUrl" : "https://push-api.cloud.huawei.com/v1",
        "authUrl" : "https://oauth-login.cloud.huawei.com/oauth2/v2/token"
    }
}
```

#### fcm_v1

```json
{
    "type": "fcm_v1",
    "payload": {
        // service-account google json config
        "type": "",
        "project_id": "",
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "",
        "auth_uri": "",
        "token_uri": "",
        "auth_provider_x509_cert_url": "",
        "client_x509_cert_url": ""
    }
}
```

#### fcm_legacy

```json
{
    "type": "fcm_legacy",
    "payload": {
        // Values from console.firebase.google.com
        "senderId": "",
        "authorizationKey": "",
    }
}
```
#### apns_token

```json
{
    "type": "apns_token",
    "payload": {
        // You can get this from developer.apple.com
        "teamId": "",
        "keyId": "",
        "key": "",
        "production": true,
        /**
        * One of depends what you want authorize mobile app or safari
        */
        "appBundleId": "",
        "websitePushId": "web."
    }
}
```

#### apns_cert

```json
{
    "type": "apns_cert",
    "payload": {
        // Certificate store with p12 format (on ppg-core-ios-sdk you can see instruction for that)
        "p12": "", // base64 encoded
        "passphrase": "",
        "production": true,
        /**
        * One of depends what you want authorize mobile app or safari
        */
        "appBundleId": "",
        "websitePushId": "web."
    }
}
```

Now in this bucket you can create "multiple contexts"
 - data context
 - silent context

```js
const dataContext = await bucket.createContext({
    title: "Hello world",
    body: "This is my first message!"
    
    behaviour: "https://example.com",
    behaviourIos: "app://com.example.ios/deep/link", // optional if not pass get from "behaviour"
    behaviourAndroid: "app://com.example.android/deep/link", // optional if not pass get from "behaviour"
    behaviourHuawei: "app://com.example.huawei/deep/link" // optional if not pass get from "behaviour"

    smallIcon: "https://placehold.co/64",
    icon: "https://placehold.co/256",
    image: "https://placehold.co/768x512",

    // One of 
    expiresAt: "YYYY-MM-DDT00:00:00.000Z",
    ttl: "3600", // seconds

    badgeMobile: 1, // set badge number on app icon 

    actions: [
        { 
            behaviour: "https://example.com/action1",
            behaviourIos: "app://com.example.ios/deep/link/action1", // optional if not pass get from "behaviour"
            behaviourAndroid: "app://com.example.android/deep/link/action1", // optional if not pass get from "behaviour"
            behaviourHuawei: "app://com.example.huawei/deep/link/action1", // optional if not pass get from "behaviour"
            behaviourWebPush: "https://example.com/action1", // optional if not pass get from "behaviour"

            title: "My action",
            icon: "https://placehold.co/64",
            action: "action_1"
        }
    ]

});

const silentContext = await bucket.createSilentContext({
    expiresAt: new Date(Date.now() + 3600_000).toISOString()
});

```

Platform specific params table
| Parameter          | WebPush(VAPID)| Android(FCM)  | Huawei(HMS)   | iOS (APNS)    | Safari (APNS)<sup>1</sup> |
| ------------------ |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:| 
| title              |       ✓       |       ✓       |       ✓       |       ✓       |       ✓       |
| body               |       ✓       |       ✓       |       ✓       |       ✓       |       ✓       |
| smallIcon          |       ✓       |       ✓       |       ✓       |       -       |       -       |
| icon               |       ✓       |       ✓       |       ✓       |       ✓       | ✓<sup>2</sup> |
| image              |       ✓       |       ✓       |       ✓       |       ✓       |       -       |
| bahviour           |       ✓       |       ✓       |       ✓       |       ✓       |       ✓       |
| behaviourIos       |       -       |       -       |       -       |       ✓       |       -       |
| behaviourAndroid   |       -       |       ✓       |       -       |       -       |       -       |
| behaviourHuawei    |       -       |       -       |       ✓       |       -       |       -       |
| behaviourWebPush   |       ✓       |       -       |       -       |       -       |       -       |
| badgeMobile        |       -       |       ✓       |       ✓       |       ✓       |       -       |
| actions            |       ✓       |       ✓       |       ✓       | ✓<sup>3</sup> |       -       |
| expiresAt          |       ✓       |       ✓       |       ✓       |       ✓       |       ✓       |
| ttl                |       ✓       |       ✓       |       ✓       |       ✓       |       ✓       |

1 - Non vapid safari notifications (before safari 16.4)
2 - When is declared in PushPackage
3 - action.title button label works only on "declared" values on app side / predefinied channels

Now when you have context you can send notifications to your subscribers up to **1000** in one request
```js

const result = await dataContext.sendMessages([
    bucket.createReceiver(
        //TODO: Paste your subscription data here
    ),
    bucket.createReceiver(
        //TODO: Paste your subscription data here
    ),
]);

```

#### Worker

Worker must be initialized with `ServiceWorkerGlobalScope` which is `self` in Service Worker example initialization:

sw.js file example code:
```js
import { Worker } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/worker/index.js"

new Worker(self, {
    // Endpoint to our server default fallback to https://api-core.pushpushgo.com/v1 - optional value
	endpoint: "", 
    // When "subscription change was triggered" we will inform your endpoint (webhook) - can be same endpoint 
	onSubscriptionChange: {
        // Url to your endpoint that will receive this information
        endpoint: "" 
	    headers: {
             // Custom headers
            "Some": "Header",
        }
    } 
})
```

On subscription change we will inform endpoint from onSubscriptionChange with POST method and Headers from headers field with payload:
```json
{
	"type": "change"
	"payload": {
		"oldSubscription": {
            "endpoint": "",
            "expirationTime": 0,
            "keys": {
                "p256dh": "",
                "auth": "",
            }
        },
		"newSubscription": {
            "endpoint": "",
            "expirationTime": 0,
            "keys": {
                "p256dh": "",
                "auth": "",
            }
        }
	}    
}
```

Full example how to subscribe for notifications in directory [browser jsdelivr example](/examples/browser/jsdelivr/)

### How to use with bundlers (tsc, webpack, parcel, etc)

This package should compile well with all bundlers.
If you have any issues please give us feedback in Issues section.

Full example how to subscribe for notifications in directory [browser bundle example](/examples/browser/bundled/)

### How to generate vapid keys to configure Client SDK?
```bash
$ yarn global add web-push
$ web-push generate-vapid-keys
```

##### Important!
Store this keys! 

You need to do this action only once per one website. 

This keys will be associated with your subscriptions and to encrypt your requests to providers.

In SDK provide only publicKey, privateKey is for sender.

# Support & production run
If you need production credentials or just help with integration please visit us in [discord](https://discord.gg/NVpUWvreZa) or just mail to [support@pushpushgo.com](mailto:support@pushpushgo.com)