'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: true
  }
};
// exports.alinode = {
//   enable: true,
//   package: 'egg-alinode',
// };
exports.mongoose = {
  enable:true,
  package:'egg-mongoose'
}