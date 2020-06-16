const { promisify } = require("util");
const download = promisify(require('download-git-repo')) // 下载git包
const symbols = require('log-symbols') // 对号，叉号...
const chalk = require('chalk') // 日志颜色，粉笔
const ora = require('ora') // 进度日志
const fs = require('fs')
const url = 'github:thinkjs/thinkjs'
const path = `./downloadPackage/${url.split('/')[1]}`
const spinner = ora('开始下载....')
async function downloadGit (giturl, depositPath) {
  // 如果已经下载，或者存在同名文件夹就不下载
  if (fs.existsSync(depositPath)) {
    // let downloadNamne = fs.readFileSync(`${depositPath}/package.json`).toString()
    // console.log(JSON.parse(downloadNamne).repository.url)
    console.log(symbols.error, chalk.red(`${url.split('/')[1]}已经下载`))
    return
  }
  spinner.start()
  try {
    await download(giturl, depositPath)
  } catch (error) {
    spinner.fail('下载失败')
    throw error
  }
  spinner.succeed('下载成功')
}
module.exports.download = downloadGit