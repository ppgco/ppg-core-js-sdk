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
$ npm i @pushpushgo/core-sdk-js
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

Full example how to subscribe for notifications in directory [browser jsdelivr example](/examples/browser/jsdelivr/)

### How to use with bundlers (tsc, webpack, parcel, etc)

This package should compile well with all bundlers.
If you have any issues please give us feedback in Issues section.

Full example how to subscribe for notifications in directory [browser bundle example](/examples/browser/bundled/)

### How to generate vapid keys to configure Client SDK?
```bash
$ curl -X GET https://api-core.pushpushgo.com/v1/vapid/generate 
```

##### Important!
Store this keys! 

You need to do this action only once per one website. 

This keys will be associated with your subscriptions and to encrypt your requests to providers.

In SDK provide only publicKey, privateKey is for sender.
