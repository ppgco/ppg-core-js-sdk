import { Worker as SDKWorker } from "@pushpushgo/core-sdk-js/dist/browser/worker"

declare var self: ServiceWorkerGlobalScope;

new SDKWorker(self, {
    endpoint: "https://api-core.pushpushgo.com/v1",
    onSubscriptionChange: {
        endpoint: "https://enunrfkzi9ji.x.pipedream.net",
        headers: {
            from_worker: "true"
        }
    }
})