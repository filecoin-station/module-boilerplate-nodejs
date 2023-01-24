import http from 'node:http'
import { promisify } from 'node:util'

//
// 1. Load the configuration
//

// Optional configuration
// eslint-disable-next-line no-unused-vars
const { FIL_WALLET_ADDRESS, ROOT_DIR } = process.env

//
// 2. Bootstrap your Station Module. 
//
// You can perform asynchronous operations here. Station does not
// consider the module as running until you print the `API:` line
// (see below).
//

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({
    // This metric is required
    jobsCompleted: 1234
    // Attach extra fields if desired
  }))
})
const listen = promisify(server.listen.bind(server))
await listen()

//
// 3. Let the Station know we are ready
//

// Station users won't see this
console.log(`API: http://localhost:${server.address().port}`)

//
// 4. Optionally, you can log additional info at any time
//

// Station users will see this
console.log('INFO: Connected to network')
console.log('ERROR: An error happened')

// Station users won't see this, but it will be stored in a log file
console.log('some log')
console.error('some error log')
