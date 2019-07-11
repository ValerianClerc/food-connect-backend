import { Request, Response } from 'express'
import * as passport from 'passport'

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    res.render('index', { title: 'Express' })
  }

  public msg(req: Request, res: Response): void {
    res.json({ msg: 'Hello!', sessionID: req.sessionID })
  }

  public login(req: Request, res: Response, next: Function): void {
    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
      console.log('Inside passport.authenticate() callback')
      console.log(
        `req.session.passport: ${JSON.stringify(req.session.passport)}`
      )
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, err => {
        console.log('Inside req.login() callback')
        console.log(
          `req.session.passport: ${JSON.stringify(req.session.passport)}`
        )
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        return res.send('You were authenticated & logged in!\n')
      })
    })(req, res, next)
  }

  public signup(req: Request, res: Response, next: Function): void {}

  public authReq(req: Request, res: Response, next: Function): void {
    console.log('Inside GET /authrequired callback')
    console.log(`User authenticated? ${req.isAuthenticated()}`)
    console.log(req.user)
    console.log(req.session)
    if (req.isAuthenticated()) {
      res.send('you hit the authentication endpoint\n')
    } else {
      res.redirect('/')
    }
  }
}

export const indexController = new IndexController()
