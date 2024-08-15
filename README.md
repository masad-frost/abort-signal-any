# @ungap/abort-signal-any

A [AbortSignal.any()](https://dom.spec.whatwg.org/#dom-abortsignal-any) polyfill.

```js
import '@ungap/abort-signal-any';
// require('@ungap/abort-signal-any');

const combinedSignal = AbortSignal.any([controller1.signal, controller2.signal]);

combinedSignal.addEventListener('abort', () => {
  console.log('aborted:', combinedSignal.reason);
});

controller1.abort('controller1 aborted');
```
