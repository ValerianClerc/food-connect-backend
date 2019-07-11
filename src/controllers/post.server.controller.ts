import { Request, Response } from 'express'
import { Post } from '../models/post.model'
import * as passport from 'passport'

export default class PostController {
  public create(req: Request, res: Response, next: Function): void {
    console.log(req.body)
    Post.create({
      pickupAddress: req.body.pickupAddress,
      foodType: req.body.foodType,
      consumable: req.body.consumable,
      containerType: req.body.containerType,
      allergenInfo: req.body.allergenInfo,
      foodWeight: req.body.foodWeight,
      foodValue: req.body.foodValue,
      reasonForDonation: req.body.foodValue,
      pickupTime: req.body.pickupTime,
      foodInspected: req.body.foodInspected,
      created: req.body.created,
      orgID: req.body.orgID,
    })
      .then(newPost => {
        console.log(newPost)
        res.status(200).send('create route')
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('error: index route')
      })
  }

  public index(req: Request, res: Response, next: Function): void {
    Post.find({})
      .then(posts => {
        console.log(posts)
        res.status(200).send('index route')
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('error: index route')
      })
  }

  public show(req: Request, res: Response, next: Function): void {
    res.status(200).send('show route')
  }

  public update(req: Request, res: Response, next: Function): void {
    res.status(200).send('update route')
  }

  public delete(req: Request, res: Response, next: Function): void {
    res.status(200).send('delete route')
  }
}

export const postController = new PostController()
