# u-promised

Promise based retry and backoff, bring your own Promises

[![Code Climate](https://codeclimate.com/github/kkemple/u-promised/badges/gpa.svg)](https://codeclimate.com/github/kkemple/u-promised)
[![Test Coverage](https://codeclimate.com/github/kkemple/u-promised/badges/coverage.svg)](https://codeclimate.com/github/kkemple/u-promised/coverage)
[![Issue Count](https://codeclimate.com/github/kkemple/u-promised/badges/issue_count.svg)](https://codeclimate.com/github/kkemple/u-promised)

`npm install u-promised`

## API

### retry(retries, fn)
  - retries: number (-1 === forever)
  - fn: function that returns a promise

```javascript

import highwire from '@mls-digital/highwire'
import { retry } from 'u-promised'

const { get } = highwire()
const fetchGoogle = () => get('http://google.com')

retry(3, fetchGoogle)
  .then((google) => console.log(google))
  .catch((err) => console.log('Oops, 4 attempts total', err))

// retry forever
retry(-1, fetchGoogle)
  .then((google) => console.log(google))

```

### backoff(delay, incrementor, retries, fn)
  - delay: initial delay after first failure
  - incrementor: increment to add to delay after each attempt
  - retries: number (-1 === forever)
  - fn: function that returns a promise

```javascript

import highwire from '@mls-digital/highwire'
import { backoff } from 'u-promised'

const { get } = highwire()
const fetchGoogle = () => get('http://google.com')

backoff(1000, 1000, 3, fetchGoogle)
  .then((google) => console.log(google))
  .catch((err) => console.log('Oops, 4 attempts total', err))

// backoff forever
backoff(1000, 1000, -1, fetchGoogle)
  .then((google) => console.log(google))

```

## Developing

There's really not much to this codebase. Just run `npm test`. If you would like to contribute, please first an issue explaining what you would like to change/fix/add before making a pull request.
