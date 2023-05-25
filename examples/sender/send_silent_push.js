import { PpgCoreClient } from "../module_vapid/dist/server/client/index.js";

async function run() {
  const client = new PpgCoreClient({
    // TODO: Remove endpoint from example - this is "preview deployment" not for production usage.
    endpoint: "https://ppg-core.master1.qappg.co/v1",
    apiKey: "00147c96-f0e8-4b40-b57d-992fd6c9a5ce"
  });

  const providersCredentials = [
    {
      type: "vapid",
      payload: {
        publicKey: "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w",
        privateKey: "Jqtg7AUhz2Ht3X3S4TE02nE7vZfcKYlHvyAFs1pl7ns"
      }
    }
  ];

  const httpWebhookConfig = {
    url: "https://enunrfkzi9ji.x.pipedream.net",
    headers: {
      from_worker: "yes"
    }
  }

  const bucket = await client.createBucket(providersCredentials, httpWebhookConfig);

  const silentContext = await bucket.createSilentContext({
    expiresAt: new Date(Date.now() + 3600_000).toISOString()
  });

  const result = await silentContext.sendMessages([
    bucket.createReceiver({
      "p256dh": "BMOmPybGW0idz04G_c_10e0Au01vbbUkd0u8JhwbUIpx6Awqk10iwfHcRtLKQEtcZIo7plqB8hB7JUmqSd0i1jQ",
      "auth": "G6pObGCSZzPXEqsYg3AZRw",
      "endpoint": "https://fcm.googleapis.com/fcm/send/fXG-unnnM28:APA91bHr-w9bTn0KKHQJ0A1fJRGGWWnPtV0j8VtDzRouriw0Xrxy8K9kLMhU5aPLjOLA-rKE7Lrhk7wUfP7Fn4PPM3HewCLD_e77uK-bbBD5Q47YvbexcdU40JeibOzYnZWcDWjTfy7V",
      "publicKey": "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w",
      "type": "vapid"
    })
  ]);

  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);