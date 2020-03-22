'use strict'
const numeral = require('numeral')
console.log('head of codes.', numeral(Date.now() * (1e-3)).format('000.000'))
function timeout (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, `calling back after ${ms}ms. --By Promise.`)
  })
}

timeout(3000).then(value => {
  console.log(value, numeral(Date.now() * (1e-3)).format('000.000'))
})
console.log('end of codes.', Date.now() * (1e-3))
