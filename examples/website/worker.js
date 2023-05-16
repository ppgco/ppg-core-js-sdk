import { Worker } from "./dist/browser/worker/index.js";

new Worker(self, {
    endpoint: 'http://localhost:3000/v1',
    onSubscriptionChange: {
        endpoint: "https://enunrfkzi9ji.x.pipedream.net",
        headers: {
            from_worker: "true"
        }
    }
})