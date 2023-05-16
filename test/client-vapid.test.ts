/* eslint-disable no-constant-condition */
import test from 'ava'
import {PpgCoreClient} from "../src/browser/client";

let oldWindow = global.window;
let oldNavigator = global.navigator;

// TODO: write better mocks
test.before(() => {
  global.navigator = {
    serviceWorker: {
      register() {
        return {
          pushManager: {
            subscribe() {
              return {
                toJSON() {
                  return {}
                }
              }
            },
            getSubscription() {
              return {
                toJSON() {
                  return {}
                }
              }
            }
          },
        }
      }
    },
  } as any;

  global.window = {
    PushManager: {},
  } as any;
});

test.after(() => {
  global.window = oldWindow;
  global.navigator = oldNavigator;
});

test('client test', async (t) => {
  const client = PpgCoreClient
    .builder()
    .setVapidSupport({
      swPath: './sw.js',
      scope: '/',
      userVisibleOnly: true,
      applicationServerKey: 'xyz'
    })
    .build();
  
  // const s = await client.subscribe();
  // t.assert(s.type === 'vapid', 'got vapid subscription');
  t.pass();
})