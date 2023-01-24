import http from 'node:http'
import { once } from 'node:events'
import fs from 'node:fs/promises'
import path from 'node:path'

//
// Load the configuration
//

const { FIL_WALLET_ADDRESS, ROOT_DIR } = process.env

//
// Use `ROOT_DIR` to persist metrics and other state.
//

const metrics = {
  jobsCompleted: 0
}

try {
  const previousMetrics = JSON.parse(
    await fs.readFile(path.join(ROOT_DIR, 'metrics.json'), 'utf8')
  )
  for (const key of Object.keys(metrics)) {
    if (Object.keys(previousMetrics).includes(key)) {
      metrics[key] = previousMetrics[key]
    }
  }
} catch {}

metrics.jobsCompleted++
await fs.writeFile(path.join(ROOT_DIR, 'metrics.json'), JSON.stringify(metrics))

//
// Bootstrap your Station Module. 
//
// You can perform asynchronous operations here. Station does not
// consider the module as running until you print the `API:` line
// (see below).
//

const server = http.createServer((req, res) => {
  res.end(JSON.stringify({
    // This metric is required
    jobsCompleted: metrics.jobsCompleted
    // Attach extra fields if desired
  }))
})
server.listen()
await once(server, 'listening')

//
// Let the Station know we are ready
//

console.log(`API: http://localhost:${server.address().port}`)

//
// Optionally, you can log additional info at any time
//

// Station users will see this
console.log('INFO: Connected to network')
console.log('ERROR: An error happened')

// Station users won't see this, but it will be stored in a log file
console.log('some log')
console.error('some error log')
