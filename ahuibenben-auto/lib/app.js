const {download} = require('./download')
const fs = require('fs')
const handlebars = require('handlebars') // handlebars模板
const symbols = require('log-symbols')
const chalk = require('chalk')

module.exports.init = async name => {
  console.log(chalk.green('🚀创建项目' + name))
  await download('github:su37josephxia/vue-template', name)
}
module.exports.refresh = () =>{
  let fileList = fs.readdirSync('./src/view').filter(v => {
    return v!=='Home'
  }).map(p => ({
    name: p.replace('.vue', ''),
    file: p
  }))
  // 生成路由定义
  compile({
    list
}, './src/router.js', './template/router.js.hbs')

// 生成菜单
compile({
    list
}, './src/App.vue', './template/App.vue.hbs')
  function compile (meta, filePath, templatePath) {
    if (fs.existsSync(templatePath)) {
      const content = fs.readFileSync(templatePath).toString();
      const result = handlebars.compile(content)(meta);
      fs.writeFileSync(filePath, result);
  }
  console.log(symbols.success, chalk.green(`🚀${filePath} 创建成功`))
  }
} 