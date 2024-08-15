delete AbortSignal.any;

require('./index.js');

// test 1
const aController = new AbortController();
const bController = new AbortController();
const anySignal = AbortSignal.any([aController.signal, bController.signal]);
const expectedAbortReason = 'somereason';
let once = 0;
anySignal.addEventListener('abort', () => {
  console.assert(!(once++), 'abort event called multiple times');
  console.assert(anySignal.aborted, 'expected signal to be aborted');
  console.assert(aController.signal.aborted, 'expected aController to be aborted');
  console.assert(!bController.signal.aborted, 'expected bController to NOT be aborted');
  console.assert(anySignal.reason === expectedAbortReason, 'unexpected abort reason: ' + anySignal.reason);
  console.log('passed 1');
});
aController.abort(expectedAbortReason);
aController.abort('aborted again!');
bController.abort('aborted other controller');

// test 2
const unabortedController = new AbortController();
const abortedController = aController;
const anotherAbortedController = bController;
const anySignalAborted = AbortSignal.any([unabortedController.signal, abortedController.signal, anotherAbortedController.signal]);
anySignalAborted.addEventListener('abort', () => {
	console.assert(false, 'unexpected calling of late bound abort listener');
});
console.assert(anySignalAborted.aborted, 'expected signal to be aborted');
console.assert(anySignalAborted.reason === expectedAbortReason, 'unexpected abort reason: ' + anySignal.reason);
console.assert(!unabortedController.aborted, 'expected unabortedController to NOT be aborted');
console.log('passed 2');

