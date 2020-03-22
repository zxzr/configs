'use strict'
const fs = require('fs')
const http = require('http')
const path = require('path')
const root = path.resolve(process.argv[2] || '.')
console.log(`static dir: ${root}`)
const server = http.createServer(function (request, response) {
  const absfilepath = path.join(root, request.url)
  fs.stat(absfilepath, function (err, stats) {
    if (!err && stats.isFile()) {
      console.log(`200: ${request.url} : ${absfilepath}`)
      response.writeHead(200)
      fs.createReadStream(absfilepath).pipe(response)
    } else if (!err && stats.isDirectory()) {
      fs.readdir(absfilepath, function (err, files) {
        if (!err) {
          response.writeHead(200)
          response.end(files.join('\n'))
        }
      })
    } else {
      console.log(`404: ${request.url}`)
      response.writeHead(404)
      response.end('404 Not Found.^O^')
    }
  })
})
const lport = 9999
server.listen(lport)
console.log(`server is running at http://127.0.0.1:${lport}/`)
