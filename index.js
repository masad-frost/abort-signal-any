AbortSignal.any || (AbortSignal.any = function any(signals) {
  const controller = new AbortController();

  for (const signal of signals) {
    if (
      typeof signal !== 'object' ||
      signal === null ||
      !(
        'aborted' in signal &&
        'reason' in signal &&
        'onabort' in signal &&
        'addEventListener' in signal
      )
    ) {
      throw new TypeError('Expected all values to implement AbortSignal interface');
    }

    if (signal.aborted) {
      controller.abort(signal.reason);
      break;
    }

    signal.addEventListener('abort', () => {
      controller.abort(signal.reason);
    }, { signal: controller.signal });
  }

  return controller.signal;
});
