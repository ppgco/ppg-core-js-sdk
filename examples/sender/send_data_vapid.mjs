import { PpgCoreClient } from "@pushpushgo/core-sdk-js/server/client";

async function run() {
  const client = new PpgCoreClient({
    endpoint: "https://api-core.pushpushgo.com/v1",
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
  
  const dataContext = await bucket.createContext({
    title: "my push",
    behaviour: "https://www.wp.pl",
    icon: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
    badge: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
    image: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
    actions: [{
      icon: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
      action: 'action_pierwsza',
      behaviour: 'https://mojastronka.pl/akcja_pierwsza',
      title: "Akcja pierwsza"
    },{
      icon: "https://fastly.picsum.photos/id/803/200/300.jpg?hmac=v-3AsAcUOG4kCDsLMlWF9_3Xa2DTODGyKLggZNvReno",
      action: 'action_druga',
      behaviour: 'https://mojastronka.pl/akcja_druga',
      title: "Akcja druga"
    }]
  });

  const result = await dataContext.sendMessages([
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