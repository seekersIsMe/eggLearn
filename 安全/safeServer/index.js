const hack = require('./hack/index')
const server = require('./server/index')
const chalk = require('chalk')
const log = contents =>{
    console.log(chalk.red(contents))
}
hack.listen(4000, () =>{
    log('黑客服务启动.........')
})
server.listen(3000, () =>{
    console.log(chalk.green('正常服务启动...........'))
})