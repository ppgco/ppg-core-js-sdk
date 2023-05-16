# PushPushGo Core SDK for JavaScript / TypeScript

WIP - do not use 

npmjs: https://www.npmjs.com/package/@pushpushgo/core-sdk-js

This is a library for PushPushGo Core - can be used for both Browser / Client side.

## Product Info

PushPushGo Core* is a building blocks for:
 - sender for push notifications - we handle batch requests, aggregate response events and inform your webhook
 - serve and transform images - we handle, crop and serve your push images
 - fast implementation - we cover Android, iOS, Web with notifications support

Contact: support@pushpushgo.com

To use this SDK you need to have account in PushPushGo Core! and token to authorize your requests

## SDK Details

### Client SDK contains:
 - Base Service Worker implementation for Push Notifications
 - Client for registering Service Worker and manage Subscription

### Server SDK contains:
 - Bucket builder
 - Context builder
 - Send Data / Silent messages via API

### How to install?
```
npm i @pushpushgo/core-sdk-js
```

### How to use as modules?
```
import { PpgCoreClient as BrowserClient } from "@pushpushgo/core-sdk-js/browser/client";
import { Worker } from "@pushpushgo/core-sdk-js/browser/worker";
import { PpgCoreClient as ServerClient } from "@pushpushgo/core-sdk-js/server/client";
```

*PushPushGo Core is not same as PushPushGo product