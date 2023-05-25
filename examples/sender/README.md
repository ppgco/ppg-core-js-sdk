# Example of JS SDK Sender

## How to run example?

Install deps
```bash
$ yarn install
```

Modify example send_data_vapid.mjs with your credentials and your subscription

```js
import { PpgCoreClient } from "@pushpushgo/core-sdk-js/server/client";

async function run() {
  const client = new PpgCoreClient({
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
        my_header: "sample"
    }
  }

  const bucket = await client.createBucket(providersCredentials, httpWebhookConfig);
  
  const dataContext = await bucket.createContext({
    title: "Hello world",
    behaviour: "https://pushpushgo.com",
    body: "This is my first message!"
    icon: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
  });

  const result = await dataContext.sendMessages([
    bucket.createReceiver(
        // Paste your subscription data here
    )
  ]);

  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);
```

Run command

```bash
$ node send_data_vapid.mjs
```

You should see messageId and receive push notification :)