const koa = require('koa')
const router = require('koa-router')()
const axios =require('axios')
const app = new koa()
let modelList = [
  'cat',
  'user'
]
let testSever = 'http://localhost:3000/api/'
function request (modelList) {
  modelList.forEach(p => {
    let postParam = p === 'user' ? {
      name: '阿辉笨笨' + Math.floor(Math.random()*10),
      age: Math.floor(Math.random()*30)
    } : {
      name: '花花'+ Math.floor(Math.random()*10),
      variety: '狸花猫'
    }
    let upDateParams =  p === 'user' ? {
      name: '阿辉笨笨2',
      age: Math.floor(Math.random()*30)
    } : {
      name: '花花2',
      variety: '狸花猫1'
    }
    let id = p === 'user' ? '5eec34e8eff7864f9ccbd62a' : '5eec34f01a41a247f87fc8cb'
    console.log('请求地址', testSever + p)
    axios.get(testSever + p).then(res =>{
      console.log('请求成功')
      console.log('请求数据', res.data)
    })
    // //创建
    axios.post(testSever + p ,{
      params: postParam
    }).then(res =>{

      console.log('添加数据成功')
    })
    // // 更新
    axios.put(testSever + p + '/' + id, {
     params: upDateParams
    }).then(res =>{
      console.log('更新成功')
    })
    // //删除
    let delID = 'ssdasd'
    axios.delete(testSever + p + '/' + delID).then(res =>{
      console.log('删除成功')
    })
  });
}
request(modelList)
app.listen(3001)
