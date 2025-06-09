import { Schema, model } from 'mongoose';

export const colaboratorSchema = new Schema({
  IDCOLABORADOR: {
    type: Number,
    required: true,
    unique: true,
  },
  NOMBRE: {
    type: String,
    required: true,
    maxlength: 45,
  },
  APELLIDO: {
    type: String,
    required: true,
    maxlength: 45,
  },
  DIRECCION: {
    type: String,
    maxlength: 45,
  },
  EDAD: {
    type: Number,
  },
  PROFESION: {
    type: String,
    maxlength: 45,
  },
  ESTADOCIVIL: {
    type: String,
    maxlength: 45,
  },
});

export const Colaborator = model('Colaborator', colaboratorSchema);