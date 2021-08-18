const http = require('http')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    // Root path
    let filePath = path.join(__dirname, 'public',
    req.url === '/' ? 'index.html' : req.url)

    // Extensions
    let extname = path.extname(filePath)

    // Init content type
    let contentType = 'text/html'

    // Check ext and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript'
            break
            case '.css':
                contentType = 'text/css'
                break
                case '.json':
                    contentType = 'application/json'
                    break
                    case '.png':
                        contentType = 'image/png'
                        break
                        case '.jpg':
                            contentType = 'image/jpeg'
                            break
    }

    // Read files
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page Not Found
                fs.readFile(path.join(__dirname, 'public', '404.html'),
                (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.end(content, 'utf-8')
                })
            } else {
                // Some server error
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.end(`Server Error: ${err.code}`)
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content, 'utf-8')
        }
    })
})

server.listen(3000, () => console.log(`Server running on PORT ${PORT}`))