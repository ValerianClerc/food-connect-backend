import { Document, Model, model, Schema } from 'mongoose'

export let usersSchema: Schema = new Schema({
  /* base schema */
  email: Schema.Types.String,
})

const teachersSchema = new Schema({
  /* teachers schema */
})
const studentsSchema = new Schema({
  /* students schema */
})
