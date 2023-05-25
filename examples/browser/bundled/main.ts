import { PpgCoreClient } from "@pushpushgo/core-sdk-js/dist/browser/client"

window.addEventListener('load', () => {

  const state = document.querySelector("#state") as HTMLElement;
  const subscribe = document.querySelector("#subscribe") as HTMLElement;
  const unsubscribe = document.querySelector("#unsubscribe") as HTMLElement;

  if (!state || !subscribe || !unsubscribe) {
    throw new Error('Bad selectors')
  }

  const ppgClient = PpgCoreClient
    .builder()
    .setVapidSupport({
      scope: '/',
      swPath: '/worker.js',
      userVisibleOnly: true,
      // Here you need to use your Vapid Keys generated see README.md
      applicationServerKey: "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w"
    })
    .build();

  state.innerText = "PPG Client loaded";

  subscribe.addEventListener('click', async () => {
    state.innerText = 'try to subscribe...';
    if (await ppgClient.isSubscribed()) {
      state.innerText = 'actualy subscribed - check console log for details';
      console.log(JSON.stringify(await ppgClient.getSubscription(), null, 2));
    } else {
      const subscription = await ppgClient.subscribe();
      state.innerText = 'subscribed, check console log for details'
      console.log(JSON.stringify(subscription, null, 2));
    }
  });

  unsubscribe.addEventListener('click', async () => {
    state.innerText = 'try to unsubscribe...';
    if (await ppgClient.isSubscribed()) {
      state.innerText = 'subscribed, do unsubscribe logic'
      const subscription = await ppgClient.unsubscribe();
    } else {
      state.innerText = 'not subscribed, cannot unsubscribe';
    }
  });

})