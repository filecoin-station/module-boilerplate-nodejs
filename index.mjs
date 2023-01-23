import http from 'node:http'
import { promisify } from 'node:util'

// Optional configuration
// eslint-disable-next-line no-unused-vars
const { FIL_WALLET_ADDRESS, ROOT_DIR } = process.env

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({
    // This metric is required
    jobsCompleted: 1234
    // Attach extra fields if desired
  }))
})
const listen = promisify(server.listen.bind(server))
await listen()

// Station users won't see this
console.log(`API: http://localhost:${server.address().port}`)

// Station users will see this
console.log('INFO: Connected to network')
console.log('ERROR: An error happened')

// Station users won't see this, but it will be stored in a log file
console.log('some log')
console.error('some error log')
