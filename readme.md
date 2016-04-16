# u-promised

Promise based retry and backoff, bring your own Promises

[![Code Climate](https://codeclimate.com/github/kkemple/u-promised/badges/gpa.svg)](https://codeclimate.com/github/kkemple/u-promised)
[![Test Coverage](https://codeclimate.com/github/kkemple/u-promised/badges/coverage.svg)](https://codeclimate.com/github/kkemple/u-promised/coverage)
[![Issue Count](https://codeclimate.com/github/kkemple/u-promised/badges/issue_count.svg)](https://codeclimate.com/github/kkemple/u-promised)
[![Circle CI](https://circleci.com/gh/kkemple/u-promised.svg?style=svg)](https://circleci.com/gh/kkemple/u-promised)

`npm install u-promised`

## API

### retry(retries, fn)
  - retries:
    - number (0 - ...)
    - -1 (retry forever)
    - function (evaluated after each attempt; should return boolean)
  - fn: function that returns a promise

```javascript

import highwire from '@mls-digital/highwire'
import { retry } from 'u-promised'

const { get } = highwire()
const fetchGoogle = () => get('http://google.com')

retry(3, fetchGoogle)
  .then((google) => console.log(google))
  .catch((err) => console.log('Oops, 4 attempts total', err))

// retry forever - no catch
retry(-1, fetchGoogle)
  .then((google) => console.log(google))

// evalute retries
const evalRetry = () => {
  let index = 0
  return () => {
    if (index === 5) return false
    index++
    return true
  }
}

retry(evalRetry(), fetchGoogle)
  .then((google) => console.log(google))
  .catch((err) => console.log('Oops, 6 attempts total', err))

```

### backoff(delay, incrementor, retries, fn)
  - delay: initial delay after first failure
  - incrementor: increment to add to delay after each attempt
  - retries:
      - number (0 - ...)
      - -1 (retry forever)
      - function (evaluated after each attempt; should return boolean)
  - fn: function that returns a promise

```javascript

import highwire from '@mls-digital/highwire'
import { backoff } from 'u-promised'

const { get } = highwire()
const fetchGoogle = () => get('http://google.com')
const SECOND = 1000

backoff(SECOND, SECOND, 3, fetchGoogle)
  .then((google) => console.log(google))
  .catch((err) => console.log('Oops, 4 attempts total', err))

// backoff forever
backoff(SECOND, SECOND, -1, fetchGoogle)
  .then((google) => console.log(google))

// evaluate backoff
// evalute retry
const evalRetry = () => {
  let index = 0
  return () => {
    if (index === 5) return false
    index++
    return true
  }
}

backoff(SECOND, SECOND, evalRetry(), fetchGoogle)
  .then((google) => console.log(google))
  .catch((err) => console.log('Oops, 6 attempts total', err))
```

## Developing

There's really not much to this codebase. Just run `npm test`. If you would like to contribute, please first an issue explaining what you would like to change/fix/add before making a pull request.
