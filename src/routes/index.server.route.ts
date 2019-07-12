import { Express } from 'express'
import { indexController } from '../controllers/index.server.controller'

function testFunc(req, res, next) {
  console.log('TEST!')
  next()
}

export default class IndexRoute {
  constructor(app: Express) {
    app.route('/').get(indexController.index)
    app.route('/msg').get(testFunc, indexController.msg)
    app.route('/login').post(indexController.login)
    app.route('/authrequired').get(indexController.authReq)
    app.route('/signupdonor').post(indexController.signupdonor)
    app.route('/signuprecipient').post(indexController.signuprecipient)
    app.route('/getusers').get(indexController.getusers)
    app.route('/getuser/:userID').get(indexController.getuser)
  }
}
