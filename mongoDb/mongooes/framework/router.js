const router = require('koa-router')()
const {
  init,create, get, del, update
} = require('./app')
router.get('/api/:model', init, get)
router.post('/api/:model', init, create)
router.delete('/api/:model/:id', init, del)
router.put('/api/:model/:id', init, update)
module.exports = router.routes()