const http = require('http')
const fs = require('fs')
const path = require('path')
const { error } = require('console')
fs.readFile(path.join("./visits.txt"), 'utf-8' ,(err, data) => {
                if (err) {
                    throw err
                } else {
                    console.log(Number(data.split(': ')[1])+1)
                    fs.writeFileSync('./visits.txt' , `Количество посещений: `+(Number(data.split(': ')[1])+1), 'utf-8')
                }
            })