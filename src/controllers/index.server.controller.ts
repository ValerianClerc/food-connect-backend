import { Request, Response } from 'express'
import * as passport from 'passport'
import { User, Donor, Recipient } from '../models/user.model'
import { blockchain } from '../helpers/blockchainInteractions'

export default class IndexController {
  public index(req: Request, res: Response, next: Function): void {
    res.render('index', { title: 'Express' })
  }

  public msg(req: Request, res: Response) {
    blockchain
      .getFood('my_id12345')
      .then(resp => {
        console.log(resp)
        res.json({
          msg: 'Hello!',
          sessionID: req.sessionID,
          blockchainResp: resp,
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err)
      })
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
    })
      .then(donor => {
        User.create({
          email: req.body.email,
          password: req.body.password,
          orgName: req.body.orgName,
          address: req.body.address,
          donorID: req.body.donorID,
          recipientID: donor._id,
        })
          .then(user => {
            return res.status(200).json(user)
          })
          .catch(err => {
            return res.status(500).json({
              error: 'internal error',
            })
          })
      })
      .catch(err => {
        return res.status(500).json({
          error: 'internal error',
        })
      })
  }

  public signuprecipient(req: Request, res: Response, next: Function): void {
    console.log(req.body)
    Recipient.create({
      orgType: req.body.orgType,
      numberToFeed: req.body.numberToFeed,
      availableTimes: req.body.availableTimes,
      typeOfFood: req.body.typeOfFood,
      wishlistBlacklist: req.body.wishlistBlacklist,
      charityID: req.body.charityID,
    })
      .then(recipient => {
        User.create({
          email: req.body.email,
          password: req.body.password,
          orgName: req.body.orgName,
          address: req.body.address,
          donorID: req.body.donorID,
          recipientID: recipient._id,
        })
          .then(user => {
            return res.status(200).json(user)
          })
          .catch(err => {
            return res.status(500).json({
              error: 'internal error',
            })
          })
      })
      .catch(err => {
        return res.status(500).json({
          error: 'internal error',
        })
      })
  }

  public getuser(req: Request, res: Response, next: Function): void {
    User.findById(req.params.userID)
      .then(user => {
        return res.json(user)
      })
      .catch(err => {
        return res.status(500).json({
          error: 'internal error',
        })
      })
  }

  public getusers(req: Request, res: Response, next: Function): void {
    User.find({}).then(users => {
      res.json(users)
    })
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
