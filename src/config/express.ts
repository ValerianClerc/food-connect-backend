import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as logger from 'morgan'
import * as path from 'path'
import config from './config'
import * as session from 'express-session'
import * as uuid from 'uuid'
import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import { TSNonNullExpression, TSTypeQuery } from 'babel-types'
import * as cors from 'cors'
const FileStore = require('session-file-store')(session)
const LocalStrategy = require('passport-local').Strategy

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
      .then(() => {
        console.log('Successfully connected to mongo!')
      })
      .catch(() => {
        console.log('Error connecting to mongo')
      })
  }

  app.set('views', path.join(__dirname, '../../src/views'))
  app.set('view engine', 'pug')

  app.use(cors())
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
      cookie: {
        secure: false,
      },
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  const users = [
    { id: '2f24vvg', email: 'test@test.com', password: 'password' },
  ]

  // configure passport.js to use the local strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log('Inside local strategy callback')
      // here is where you make a call to the database
      // to find the user based on their username or email address
      // for now, we'll just pretend we found that it was users[0]
      const user = users[0]
      if (email === user.email && password === user.password) {
        console.log('Local strategy returned true')
        return done(null, user)
      }
    })
  )

  // tell passport how to serialize the user
  passport.serializeUser<any, any>((user, done) => {
    console.log(
      'Inside serializeUser callback. User id is save to the session file store here'
    )
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser callback')
    console.log(
      `The user id passport saved in the session file store is: ${id}`
    )
    const user = users[0].id === id ? users[0] : false
    done(null, user)
  })

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
