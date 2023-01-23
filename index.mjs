import http from 'node:http'
import { promisify } from 'node:util'
import timers from 'node:timers/promises'

// Optional configuration
// eslint-disable-next-line no-unused-vars
const { FIL_WALLET_ADDRESS, ROOT_DIR } = process.env

// Some internal state
let connected = false
let jobsCompleted = 0

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({
    // This metric is required
    jobsCompleted,
    // This will be ignored
    some: 'extra'
  }))
})
const listen = promisify(server.listen.bind(server))
await listen()

// Station users won't see this, but it is required to output
console.log(`API: http://localhost:${server.address().port}`)

while (true) {
  if (!connected) {
    connected = true
    // Station users will see this
    console.log('INFO: Connected to network')
  }

  if (Math.random() < 0.1) {
    // Station users will see this
    console.log('ERROR: An error happened')
  }

  // Station users won't see this, but it will be stored in a log file
  console.log('some info')
  console.error('some error info')

  jobsCompleted++
  await timers.setTimeout(1000)
}
