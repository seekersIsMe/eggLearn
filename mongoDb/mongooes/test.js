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
       // 获取
  axios.get(testSever + p ,{
    params: {
      id: ''
    }
  })
  //创建
  axios.post(testSever + p ,{
    params: {
      name: '',
      age: 10
    }
  })
  // 更新
  axios.put(testSever + p, {
    name: '',
    age: 10
  })
  //删除
  axios.delete(testSever + p, {
    name: ''
  })
  });
}
request(modelList)
app.listen(3001)
