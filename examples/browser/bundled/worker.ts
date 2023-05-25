import { Worker as SDKWorker } from "@pushpushgo/core-sdk-js/dist/browser/worker"

declare var self: ServiceWorkerGlobalScope;

new SDKWorker(self, {
    // TODO: Remove endpoint from example - this is "preview deployment" not for production usage.
    endpoint: "https://ppg-core.master1.qappg.co/v1",
    onSubscriptionChange: {
        endpoint: "https://enunrfkzi9ji.x.pipedream.net",
        headers: {
            from_worker: "true"
        }
    }
})