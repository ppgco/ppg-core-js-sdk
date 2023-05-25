# Example of JS SDK

## How to run example?

Install deps
```bash
$ yarn install
```

Run build scripts
```bash
$ yarn build
```

Serve files via live-server and open browser to check
Open developer tools (you will see subscription in console)
```bash
$ yarn serve
```

In console you will see sth like:

```json
{
  "type": "vapid",
  "p256dh": "BIIwKdd5QUNCEfcB7a8HXHXWt2UHdCqAF8zwLp-RZVjgQSZZAiXS5jKVXPafCC0VtRnlrtABwnePZpAxML-iZWk",
  "auth": "AGVMtdybGTNy9oV04FJiOQ",
  "endpoint": "https://web.push.apple.com/QORAQ85NCsx1bRVjDhr-tWjJRpVBYc12zZbCtvPdgTFmqiG5DCGDOgN0JM_EpBOeqhAKEnEYn3468dQg5SoDUicnhOvoVQLmyC_etcPLo2BLILGeD4M3i83DsMbeDvxjq5ETj8OQSz9-im9hj3j56rmbe5sxRVdH15BOYIEB1sk",
  "publicKey": "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w",
  "expirationTime": null
}
```

It's your subscription, now you can send message to this subscriber via our SDK

## How to send a message?
```js
{
  "type": "vapid",
  "p256dh": "BIIwKdd5QUNCEfcB7a8HXHXWt2UHdCqAF8zwLp-RZVjgQSZZAiXS5jKVXPafCC0VtRnlrtABwnePZpAxML-iZWk",
  "auth": "AGVMtdybGTNy9oV04FJiOQ",
  "endpoint": "https://web.push.apple.com/QORAQ85NCsx1bRVjDhr-tWjJRpVBYc12zZbCtvPdgTFmqiG5DCGDOgN0JM_EpBOeqhAKEnEYn3468dQg5SoDUicnhOvoVQLmyC_etcPLo2BLILGeD4M3i83DsMbeDvxjq5ETj8OQSz9-im9hj3j56rmbe5sxRVdH15BOYIEB1sk",
  "publicKey": "BMLa3ig2yYnIv-TcpqiShHjy8mRjGFt2vPq-AHEx4ARGen-g8_GfF5ybpqVeXy_zdaEUxYEz1kF1IsLwyIHmP2w",
  "expirationTime": null
}
```

To send message check examples with our [Sender SDK](/examples/sender/)