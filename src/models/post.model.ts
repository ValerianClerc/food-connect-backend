import { Document, Model, model, Schema } from 'mongoose'
import { IUser } from './user.model'

export interface IPost extends Document {
  pickupAddress: String
  foodType: String
  consumable: String
  allergenInfo: String
  foodWeight: Number
  foodValue: Number
  reasonForDonation: String
  pickupTime: String
  foodInspected: Boolean
  orgID: String
  created: Date
  expirationDate: String
  matched: String
  status: String
}

export let PostSchema: Schema = new Schema({
  pickupAddress: {
    type: String,
  },
  foodType: {
    type: String,
  },
  consumable: {
    type: String,
  },
  containerType: {
    type: String,
  },
  allergenInfo: {
    type: String,
  },
  foodWeight: {
    type: Number,
  },
  foodValue: {
    type: Number,
  },
  reasonForDonation: {
    type: String,
  },
  pickupTime: {
    type: String,
  },
  foodInspected: {
    type: Boolean,
  },
  created: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
  orgID: {
    // type: Schema.Types.ObjectId,
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
  },
  matched: {
    type: Schema.Types.ObjectId,
  },
  status: {
    type: String,
  },
})

export const Post: Model<IPost> = model<IPost>('Post', PostSchema)
