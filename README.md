# **CORE** _by PushPushGo_ SDK for JavaScript / TypeScript

[![npmjs version](https://img.shields.io/npm/v/@pushpushgo/core-sdk-js?style=flat-square)](https://www.npmjs.com/package/@pushpushgo/core-sdk-js)
![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/ppgco/ppg-core-js-sdk/publish.yml?style=flat-square)
![GitHub tag (latest)](https://img.shields.io/github/v/tag/ppgco/ppg-core-js-sdk?style=flat-square)
[![Discord](https://img.shields.io/discord/1108358192339095662?color=%237289DA&label=Discord&style=flat-square)](https://discord.gg/NVpUWvreZa)

## Product Info

**CORE** _by PushPushGo_ is a hassle-free building block for all your web and mobile push needs.

Send your transactional and bulk messages, and we'll take care of the rest.

#### What we offer:
 - Ready SDK for client/server integration - we have SDK for the most popular platforms.
 - Mobile and WebPush implementation (APNS, FCM, VAPID).
 - Transactional and bulk push notifications through API.
 - Hassle-free usage. Our servers handle traffic peaks and store images.
 - Event aggregation in bulk sent to your webhook for easy analysis or running your business logic.
 - GDPR-ready solution protecting private data in accordance with EU regulations.
 - No vendor lock-in - build and own your subscriber base (stateless solution).

#### What you get:
 - Cost-effective solution: pay for sent pushes, not for infrastructure, traffic, and storage.
 - Save time and effort on developing the sender and infrastructure.
 - Simple API interface for all channels with bulk support.
 - Support on our [Discord Server](https://discord.gg/NVpUWvreZa).
 - You can implement notification features your way.

#### Try it if:
 - You want to control the flow in your transactional messages and add a push notification channel.
 - You're looking for an easy push notifications tool for your organization, whether it's finance, e-commerce, online publishing, or any other sector.
 - You work in a software house and build solutions for your clients.
 - You want a hassle-free solution to focus on other tasks at hand.
 - You want to implement an on-premise solution for sending notifications.
 - You have issues with an in-house solution.
 - You're looking for a reliable provider and cooperation based on your needs.

## How it works

When client register for notifications you will get object with:
 - Credentials
 - Token/endpoint
 - Type of provider
 - Identifier of provider

We call this **Recipient** - it's your subscription data, store it in your database.

When you try to send message you will prepare:

 - **Bucket** - your temporary credentials bucket - this bucket can be reused any time, or recreated when credentials changed,

 - **Context** - your message - this context can be reused to send bulk messages or just used once when you send transactional message then is context is **temporary**

When you send message you will _authorize_ via **bucket** data, prepare message with **context** and send to **recipients** that can be bulked up to 1000 per request.

On the server side:
 - We validate and prepare the message body.
 - Then, we upload and resize images to our CDN.
 - Next, we connect and send to different providers.

On the client side:
 - Get notifications via our SDK in your App/Website.
 - When interacting with a notification, we collect events with our API.

On the server side:
 - We aggregate events and deliver them in bulk to your webhook endpoint.

### Architecture

![image](https://i.ibb.co/tst39rS/architecture.png "Architecture")

When a message is delivered to the device and interacts with the user, we collect events and pass them to our API. The collected events are resent to your webhook endpoint.

#### Webhooks events
During the journey of push we will trigger webhook events.

| Push Type    | Event      | Foreground | Background |
|---------|------------|------------|------------|
| Data    |            |            |            |
|         | delivered  | ✓          | ✓          |
|         | clicked    | ✓          | ✓          |
|         | sent       | ✓          | ✓          |
|         | close      | ✓          | ✓          |
| Silent<sup>1</sup>  |            |            |            |
|         | delivered  | ✓          | ✓          |
|         | sent       | ✓          | ✓          |

<small><sup>1</sup> - webpush doesn't support silent messages due to Push API implementation</small>

If `foreignId` field was passed with `receiver` then it will also be included in event in message.

Example events package:

```json
{
    "messages": [
        {
            "messageId": "8e3075f1-6b21-425a-bb4f-eeaf0eac93a2",
            "foreignId": "my_id",
            "result": {
                "kind": "delivered"
            },
            "ts": 1685009020243
        }
    ]
}
```

## Pricing

We charge $0.50 USD for every 1000 sent notifications.

## Support & Sales

Join our [Discord](https://discord.gg/NVpUWvreZa) to get support, your api key, talk or just keep an eye on it.

<sub>**CORE** _by PushPushGo_ is not the same as our main **PushPushGo** product - are you looking for [PushPushGo - Push Notifications Management Platform?](https://pushpushgo.com)</sub>

## Client side SDK - supported platforms / providers

| Platform | Provider | SDK        |
|----------|----------|------------|
| Android / Huawei  | FCM / HMS      | [CORE Android SDK](https://github.com/ppgco/ppg-core-android-sdk) |
| iOS | APNS      | [CORE iOS SDK](https://github.com/ppgco/ppg-core-ios-sdk) |
| Flutter | FCM / HMS / APNS      | [CORE Flutter SDK](https://github.com/ppgco/ppg-core-flutter-sdk) |
| Web | Vapid (WebPush)     | [CORE JS SDK](https://github.com/ppgco/ppg-core-js-sdk) |

## Server side SDK (sending notifications)
| Platform | SDK      |
|----------|----------|
| JavaScript / TypeScript  | [CORE JS SDK](https://github.com/ppgco/ppg-core-js-sdk) | 
| .NET  | [WIP - ask](https://discord.gg/NVpUWvreZa) | 
| Java  | [WIP - ask](https://discord.gg/NVpUWvreZa) | 

# SDK Integration instructions

To use this SDK you need to have account in **CORE** by _PushPushGo_! and token to authorize your requests.

This package contains two modules "client" and "server".

ClientSDK is for requesting push notifications.

ServerSDK is for sending push notifications via **CORE** by _PushPushGo_ API [Swagger](https://linkto.swagger.pushushgo.com)

[Autogenerated Docs](https://ppgco.github.io/ppg-core-js-sdk/)

## Client SDK:
 - Service Worker implementation for Push Notifications
 - Client for registering Service Worker and manage Subscription (Receiver)

### How to use as modules in browser via jsdelivr?
```typescript
import { PpgCoreClient } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/client/index.js"
import { Worker } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/worker/index.js"
```

### Worker

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
```js
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

### Client Browser - Subscribe to nofications

```js
const ppgClient = PpgCoreClient
.builder()
.setVapidSupport({
    // Set scope - root scope preferred
    scope: '/',
    // Set path of service worker module file
    swPath: '/worker.js',
    // Service worker parameters
    userVisibleOnly: true,
    // Public Vapid Key
    applicationServerKey: "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w"
})
.build();

```

Client contains method:

```js
  browserSupportsWebPush(): boolean;
  isSubscribed(): Promise<boolean>;
  // prompt for allow notifications if accept then you will get subscription - store this in you database for future sending
  subscribe(): Promise<object>; 
  // returns actual subscription
  getSubscription(): Promise<null | object>; 
  unsubscribe(): Promise<boolean>;
```

Full example how to subscribe for notifications in directory [browser jsdelivr example](/examples/browser/jsdelivr/)

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

### Server client

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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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
    channelName: "default",
    title: "Hello world",
    body: "This is my first message!",
    subtitle: "My subtitle for ios or legacy safari"
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
    externalData: "{\"sample\": true}",
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

Platform specific params for DataContext table
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
| badge              | ✓<sup>3</sup> |       ✓       |       ✓       |       ✓       |       -       |
| actions            |       ✓       |       ✓       |       ✓       |       ✓       |       -       |
| actions.title      |       ✓       |       -       |       -       | ✓<sup>4</sup> |       -       |
| actions.icon       |       -       |       -       |       -       |       -       |       -       |
| actions.action     |       ✓       |       ✓       |       ✓       |       ✓       |       -       |
| actions.behaviour  |       ✓       |       ✓       |       ✓       |       ✓       |       -       |
| subtitle           |       -       |       -       |       -       |       ✓       |       ✓       |
| externalData       |       ✓       |       ✓       |       ✓       |       ✓       |       -       |
| expiresAt          |       ✓       |       ✓       |       ✓       |       ✓       |       ✓       |
| ttl                |       ✓       |       ✓       |       ✓       |       ✓       |       ✓       |
| channelName        |       ✓       |       ✓       |       ✓       |       ✓       |       -       |

<small>
<sup>1</sup> - Non vapid safari notifications (before safari 16.4) <br/>
<sup>2</sup> - When is declared in PushPackage <br/>
<sup>3</sup> - On webpush if browser supports clearAppBadge / setAppBadge <br/>
<sup>4</sup> - action.title button label works only on "declared" values on app side / predefinied channels <br/>
</small>


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

You can also send "transactional" message without creating context direcly on bucket:

Data context:
```js
const result = await bucket.sendMessage(
    bucket.createReceiver(
        //TODO: Paste your subscription data here
    ),
    {
        title: "...",
        body: "...",
        behaviour: "...",
        // other params from context
    }
]);
```

Silent context:
```js
const result = await bucket.sendSilentMessage(
    bucket.createReceiver(
        //TODO: Paste your subscription data here
    ),
    {
        externalData: "..."
    }
]);
```

Full example how to send notifications in directory [server sender example](/examples/sender/)


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
All API keys available in this documentation allows you to test service with very low rate-limits.
If you need production credentials or just help with integration please visit us in [discord](https://discord.gg/NVpUWvreZa) or just mail to [support+core@pushpushgo.com](mailto:support+core@pushpushgo.com)
