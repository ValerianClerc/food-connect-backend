import { Request, Response } from 'express'
import { Post } from '../models/post.model'
import * as passport from 'passport'
import { blockchain } from 'helpers/blockchainInteractions'

const statusDonorPosted: string = 'Donor Inspected/Posted'
const statusRecipientAccepted: string = 'Recipient Accepted'
const statusFoodPickedUp: string = 'Food Picked Up'
const statusRecipientInspected: string = 'Recipient Inspected'

export default class PostController {
  public create(req: Request, res: Response, next: Function): void {
    console.log(req.body)
    Post.create({
      pickupAddress: req.body.pickupAddress,
      foodType: req.body.foodType,
      consumable: req.body.consumable,
      allergenInfo: req.body.allergenInfo,
      foodWeight: req.body.foodWeight,
      foodValue: req.body.foodValue,
      reasonForDonation: req.body.foodValue,
      pickupTime: req.body.pickupTime,
      foodInspected: req.body.foodInspected,
      created: req.body.created,
      orgID: req.body.orgID,
      expirationDate: req.body.expirationDate,
      matched: req.body.matched,
      status: req.body.status,
    })
      .then(newPost => {
        console.log(newPost)
        blockchain.createFood(newPost._id, statusDonorPosted)
        res.status(200).json(newPost)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('error: create route')
      })
  }

  public index(req: Request, res: Response, next: Function): void {
    Post.find({})
      .then(posts => {
        console.log(posts)
        res.status(200).json(posts)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('error: index route')
      })
  }

  public show(req: Request, res: Response, next: Function): void {
    console.log(req.params.postID)
    Post.findById(req.params.postID)
      .then(post => {
        if (!post) {
          return res.status(404).send('post not found')
        }
        console.log(post)
        res.status(200).json(post)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('error: show route')
      })
  }

  public update(req: Request, res: Response, next: Function): void {
    console.log(req.params.postID)
    Post.findByIdAndUpdate(req.params.postID, req.body)
      .then(post => {
        console.log(post)

        let newStatus: string = ''

        switch (post.status) {
          case statusDonorPosted:
            newStatus = statusDonorPosted
            break
          case statusRecipientAccepted:
            newStatus = statusRecipientAccepted
            break
          case statusFoodPickedUp:
            newStatus = statusFoodPickedUp
            break
          case statusRecipientInspected:
            newStatus = statusRecipientInspected
            break
          default:
            return res.status(400).json({
              error: 'status field invalid',
            })
            break
        }

        blockchain
          .updateFood(post._id, newStatus)
          .then(resp => {
            return res.status(200).json(post)
          })
          .catch(err => {
            return res.status(500).json({
              error: 'error updating blockchain entry',
            })
          })
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send('error: update route')
      })
  }

  public delete(req: Request, res: Response, next: Function): void {
    console.log(req.params.postID)
    Post.findByIdAndRemove(req.params.postID)
      .then(post => {
        if (!post) {
          return res.status(404).send({
            success: false,
          })
        }
        console.log(post)
        res.status(200).json({
          success: true,
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('error: delete route')
      })
  }
}

export const postController = new PostController()
