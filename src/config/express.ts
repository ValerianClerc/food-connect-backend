import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as logger from 'morgan'
import * as path from 'path'
import config from './config'
import * as session from 'express-session'
import * as uuid from 'uuid'
const FileStore = require('session-file-store')(session)

export default function() {
  const app: express.Express = express()

  for (const model of config.globFiles(config.models)) {
    require(path.resolve(model))
  }

  if (config.useMongo) {
    mongoose
      .connect(config.mongodb, {
        promiseLibrary: global.Promise,
        useMongoClient: true,
      })
      .catch(() => {
        console.log('Error connecting to mongo')
      })
  }

  app.set('views', path.join(__dirname, '../../src/views'))
  app.set('view engine', 'pug')

  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../../src/public')))

  app.use(
    session({
      genid: (req: express.Request) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
      },
      store: new FileStore(),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
    })
  )

  for (const route of config.globFiles(config.routes)) {
    require(path.resolve(route)).default(app)
  }

  app.use(
    (req: express.Request, res: express.Response, next: Function): void => {
      const err: Error = new Error('Not Found')
      next(err)
    }
  )

  return app
}
