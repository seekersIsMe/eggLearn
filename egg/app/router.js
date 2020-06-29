'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/favicon.ico', (ctx, next) => {
    ctx.body = '';
    next();
  });
  router.get('/list', controller.home.list);
  router.get('/api/list', (ctx, next) => {
    console.log('哈哈哈');
    next();
  },
  controller.list.index);
  router.get('/api/category', controller.category.index)
};
