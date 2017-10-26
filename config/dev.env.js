var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VIDEO_HOST: '"http://185.9.81.95:7320/video"',
  WS_REMOTE_HOST: '"ws://185.9.81.95:8251/websocket"',
})
