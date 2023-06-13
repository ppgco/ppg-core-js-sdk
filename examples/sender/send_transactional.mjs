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
      from_worker: "yes"
    }
  }

  const bucket = await client.createBucket(providersCredentials, httpWebhookConfig);
  
  const result = await bucket.sendMessage(
    bucket.createReceiver({
      "type": "vapid",
      "p256dh": "BEY7Tb44GDZsHRdyE5MgAdiP1GAz9Ql8-xNn5Ud7QdkPswSsYBm96EWj5x4NF420jyyDJCDzATUfxOCzcMFWsfg",
      "auth": "Iuthaty72DglwnhEvnkr6g",
      "endpoint": "https://fcm.googleapis.com/fcm/send/cLvtxXjswsk:APA91bFSWzYOHt10Kb0712TgUvWuHOPZztwQ2o4LLv5p62FethqLMV_7OqhfHEBySegFwTrOq8wU1_YV780kebk2-G3qfV_DpQODhlULiM8hwwrvQWGslJwPkq3-hxkKpClaTf5mKtyu",
      "publicKey": "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w",
      "expirationTime": null
    }),
    {
      externalData: "mydata:1",
      title: "My first push",
      body: "Hello world from example",
      behaviour: "https://pushpushgo.com",
      icon: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
      smallIcon: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno"
    });

  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);