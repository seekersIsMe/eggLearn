> 其实原理和sql注入差不多，都是通过拼接执行语句，达到黑客的恶意目的
以nodejs为例，例如在接口中需要从github上下载指定的repo
```
const exec = require('mz/child_process').exec;
let params = {/* 用户输入的参数 */}
exec('git clone ${params} ')

// 如果传入一下参数会怎么样呢
https://github.com/xx/xx.git && rm -rf /* &&

这样就会导致把当前目录下的文件全删除了，当然高明的黑客肯定不会去破坏宿主机，他会下载相关恶意程序，神不知鬼不觉的来，又神不知鬼不觉的走
```