# PushPushGo Core SDK for JavaScript / TypeScript

WIP - do not use 

![npmjs version](https://img.shields.io/npm/v/@pushpushgo/core-sdk-js?style=flat-square)
![GitHub Workflow Status (main)](https://img.shields.io/github/actions/workflow/status/ppgco/ppg-core-js-sdk/publish.yml?style=flat-square)
![GitHub tag (latest)](https://img.shields.io/github/v/tag/ppgco/ppg-core-js-sdk?style=flat-square)
![Discord](https://img.shields.io/discord/XXXXXXXXXXXXXXXXXXXXXX?color=%237289DA&label=Discord&style=flat-square)

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

### How to use as modules in backend?
```
import { PpgCoreClient as BrowserClient } from "@pushpushgo/core-sdk-js/browser/client";
import { Worker } from "@pushpushgo/core-sdk-js/browser/worker";
import { PpgCoreClient as ServerClient } from "@pushpushgo/core-sdk-js/server/client";
```

### How to use as modules in browser via jsdelivr?
```
import { PpgCoreClient as BrowserClient } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/client/index.js"
import { Worker } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/worker/index.js"
import { PpgCoreClient as ServerClient  } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/server/client/index.js"

```

*PushPushGo Core is not same as PushPushGo product