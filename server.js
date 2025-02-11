const http = require('http')
const fs = require('fs')
const path = require('path')
const { error } = require('console')

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('server request', req.url, req.method)
    // определяем путь к файлу
    const createPath = page => path.resolve(__dirname, 'pages', `${page}.html`)
    let basePath = ''

    // проверяем, запрашивается ли css
    if (req.url.startsWith('/pages/styles/')) {
        const cssPath = path.resolve(__dirname, 'pages', 'styles',req.url.split("/")[req.url.split("/").length - 1])
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('CSS не найден')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' })
                res.end(data)
            }
        })
        return
    }

    else if(req.url.startsWith('/pages/scripts/')){
        fs.readFile(path.resolve(__dirname, 'pages', 'scripts', req.url.split("/")[req.url.split("/").length-1]), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('JS не найден')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' })
                res.end(data)
            }
        })
        return    
    }

    // базовая имплементация роутинга
    switch (req.url) {
        case '/':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('main')
            fs.readFile(path.join("./visits.txt"), 'utf-8' ,(err, data) => {
                            if (err) {
                                throw err
                            } else {
                                fs.writeFileSync('./visits.txt' , `Количество посещений: `+(Number(data.split(': ')[1])+1), 'utf-8')
                            }
                        })
            res.statusCode = 200
            break
        case '/page1':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page1')
            res.statusCode = 200
            break
        case '/page2':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page2')
            res.statusCode = 200
            break
        case '/page23':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page23')
            res.statusCode = 200
            break
        case '/page4':
            res.writeHead(200 ,{'Content-Type': 'application/json'})
            const data = JSON.stringify({
                justJSON : [
                { name: 'Иван', age: 30 },
                { name: 'Анатолий', age: 40 }
            ],
            linkOnPage5 : "localhost:3000/page5"
    })
                res.statusCode = 500
                res.end(data)
            break
        case '/page5':
            res.writeHead(200 ,{'Content-Type': 'text/plain'})
            fs.readFile(path.resolve(__dirname, 'visits.txt'), 'utf-8', (err,data) => {
                if (err) {
                    res.writeHeader(404, { 'Content-Type': 'text/plain' })
                    res.end('txt не найден')
                } else {
                    res.statusCode = 200
                    res.end(data)
                }
            })
            break 
        default:
            basePath = createPath('error')
            res.statusCode = 404
            break
    }
    if(basePath != ''){
        fs.readFile(basePath, (err, data) => {
            if (err) {
                console.log(err)
                res.statusCode = 500
                res.end()
            } else {
                res.write(data)
                res.end()
            }
        })
    }
})

server.listen(3000, 'localhost', err => {
    err ? console.log(error) : console.log(`server listening port ${PORT}`)
})