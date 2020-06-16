const fs = require('fs')
let rs = fs.createReadStream('./time.jpg') //文件读取流
let ws = fs.createWriteStream('./time2.jpg') //文件写入流
rs.pipe(ws)