import { Worker } from "https://cdn.jsdelivr.net/npm/@pushpushgo/core-sdk-js@latest/dist/browser/worker/index.js"

new Worker(self, {
    endpoint: 'https://api-core.pushpushgo.com/v1',
    onSubscriptionChange: {
        endpoint: "https://enunrfkzi9ji.x.pipedream.net",
        headers: {
            from_worker: "true"
        }
    }
})