import suite from 'tape'
import sinon from 'sinon'

import { retry, backoff } from '../lib/index.js'

suite('lib/retry(retries, fn)', (s) => {
  s.test('with 4 retries', (assert) => {
    const stub = sinon.stub().returns(Promise.reject())
    retry(4, stub)
      .then(() => assert.fail())
      .catch(() => {
        assert.equal(stub.callCount, 5, 'function should be tried 5 times total (4 retries)')
        assert.end()
      })
  })

  s.test('with 0 retries', (assert) => {
    const stub = sinon.stub().returns(Promise.reject())
    retry(0, stub)
      .then(() => assert.fail())
      .catch(() => {
        assert.equal(stub.callCount, 1, 'function should be tried 1 times total (0 retries)')
        assert.end()
      })
  })
})

suite('lib/backoff(delay, incrementor, retries, fn)', (s) => {
  s.test('with 4 retries', (assert) => {
    const stub = sinon.stub().returns(Promise.reject())
    backoff(10, 10, 4, stub)
      .then(() => assert.fail())
      .catch(() => {
        assert.equal(stub.callCount, 5, 'function should be tried 5 times total (4 retries)')
        assert.end()
      })
  })

  s.test('with 0 retries', (assert) => {
    const stub = sinon.stub().returns(Promise.reject())
    backoff(10, 10, 0, stub)
      .then(() => assert.fail())
      .catch(() => {
        assert.equal(stub.callCount, 1, 'function should be tried 1 times total (0 retries)')
        assert.end()
      })
  })
})
