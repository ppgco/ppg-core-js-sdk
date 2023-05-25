import { Worker } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/worker/index.js"

new Worker(self, {
    // TODO: Remove endpoint from example - this is "preview deployment" not for production usage.
    endpoint: "https://ppg-core.master1.qappg.co/v1",
    onSubscriptionChange: {
        endpoint: "https://enunrfkzi9ji.x.pipedream.net",
        headers: {
            from_worker: "true"
        }
    }
})