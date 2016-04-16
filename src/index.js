import isFunction from 'lodash.isFunction'

function retry(retries, fn) {
  const forever = retries === -1
  const needsEvaluation = isFunction(retries)

  return fn().catch((err) => {
    if (needsEvaluation && !retries()) return Promise.reject(err)
    if (retries <= 0 && !forever) return Promise.reject(err)
    const retriesLeft = (forever || needsEvaluation) ? retries : --retries

    return retry(retriesLeft, fn)
  })
}

function backoff(initialDelay, incrementor, retries, fn) {
  const forever = retries === -1
  const needsEvaluation = isFunction(retries)

  return fn().catch((err) => {
    if (needsEvaluation && !retries()) return Promise.reject(err)
    if (retries <= 0 && !forever) return Promise.reject(err)

    return new Promise((res) => setTimeout(res, initialDelay))
      .then(() => {
        const delay = initialDelay + incrementor
        const retriesLeft = (forever || needsEvaluation) ? retries : --retries

        return backoff(delay, incrementor, retriesLeft, fn)
      })
  })
}

module.exports = { retry, backoff }
