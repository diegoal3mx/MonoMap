import mongoose from 'mongoose'

const caseSchema = new mongoose.Schema({
  lat: { type:Number, required:true },
  lng: { type:Number, required:true },
  isEmailSent: { type:Boolean, default:false },
  genre: { type: String, enum: ['hombre', 'mujer', 'otro'], required: true },
  age: { type: Number, required:true, min: 0, max:130},
  name: { type: String, required:true},
  creationDate: { type: Date, required:true, default: Date.now }
});

export const CaseModel = mongoose.model("Cases", caseSchema );