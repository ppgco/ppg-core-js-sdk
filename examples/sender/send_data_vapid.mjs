import { PpgCoreClient } from "@pushpushgo/core-sdk-js/server/client";

async function run() {
  const client = new PpgCoreClient({
    endpoint: "https://api-core.pushpushgo.com/v1",
    apiKey: "00147c96-f0e8-4b40-b57d-992fd6c9a5ce" // For test you can use this api token - its preview one with low rate/limits. To get own please visit our discord.
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
  
  const dataContext = await bucket.createContext({
    title: "My first push",
    body: "Hello world from example",
    behaviour: "https://pushpushgo.com",
    icon: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
  });

  const result = await dataContext.sendMessages([
    bucket.createReceiver({
      "type": "vapid",
      "foreignId": "my_id",
      "p256dh": "BIIwKdd5QUNCEfcB7a8HXHXWt2UHdCqAF8zwLp-RZVjgQSZZAiXS5jKVXPafCC0VtRnlrtABwnePZpAxML-iZWk",
      "auth": "AGVMtdybGTNy9oV04FJiOQ",
      "endpoint": "https://web.push.apple.com/QORAQ85NCsx1bRVjDhr-tWjJRpVBYc12zZbCtvPdgTFmqiG5DCGDOgN0JM_EpBOeqhAKEnEYn3468dQg5SoDUicnhOvoVQLmyC_etcPLo2BLILGeD4M3i83DsMbeDvxjq5ETj8OQSz9-im9hj3j56rmbe5sxRVdH15BOYIEB1sk",
      "publicKey": "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w"    })
  ]);

  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);