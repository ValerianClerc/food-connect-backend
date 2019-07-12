import { Request, Response } from 'express'
import * as passport from 'passport'
import { User, Donor } from 'models/user.model'

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

  public signupdonor(req: Request, res: Response, next: Function): void {
    Donor.create({
      orgType: req.body.orgType,
      commercialID: req.body.commercialID,
      posts: [],
    }).then(donor => {
      User.create({
        email: req.body.email,
        password: req.body.password,
        orgName: req.body.orgName,
        address: req.body.address,
        donorID: req.body.donorID,
        recipientID: donor._id,
      }).then(user => {
        return res.status(200).json(user)
      })
    })
  }

  public signuprecipient(req: Request, res: Response, next: Function): void {
    console.log(req.body)
    if (req.body.donor) {
    }
  }

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
