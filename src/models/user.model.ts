import { Document, Model, model, Schema } from 'mongoose'

export interface IDonor extends Document {
  orgType: String
  commercialID: String
  posts: [String]
}

export interface IRecipient extends Document {
  orgType: String
  numberToFeed: String
  availableTimes: String
  typeOfFood: String
  wishlistBlacklist: String
}

export interface IUser extends Document {
  email: String
  password: String
  orgName: String
  address: String
  donorID: String
  recipientID: String
}

export let UsersSchema: Schema = new Schema({
  /* base schema */
  email: {
    type: String,
    index: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orgName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Recipient',
  },
})

export const User: Model<IUser> = model<IUser>('User', UsersSchema)

const DonorSchema = new Schema({
  orgType: {
    type: String,
  },
  commercialID: {
    type: String,
  },
  posts: {
    type: [Schema.Types.ObjectId],
  },
})

const RecipientSchema = new Schema({
  orgType: { type: String },
  numberToFeed: { type: String },
  availableTimes: { type: String },
  typeOfFood: { type: String },
  wishlistBlacklist: { type: String },
})

export const Donor: Model<IDonor> = model<IDonor>('Donor', DonorSchema)
export const Recipient: Model<IRecipient> = model<IRecipient>(
  'Recipient',
  RecipientSchema
)
