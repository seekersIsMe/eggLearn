
const {download} = require('./download')
const url = 'github:thinkjs/thinkjs'
const path = `./downloadPackage/${url.split('/')[1]}`
download(url, path)