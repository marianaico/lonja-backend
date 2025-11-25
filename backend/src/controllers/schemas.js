const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const compradorSchema = Joi.object({
  codigoCmp: Joi.string().max(30).required(),
  nombre: Joi.string().max(30).required(),
  apellidoPaterno: Joi.string().max(30).allow(''),
  apellidoMaterno: Joi.string().max(30).allow(''),
  direccion: Joi.string().max(100).allow(''),
  correo: Joi.string().email().allow('')
});

const tipoSchema = Joi.object({
  nombre: Joi.string().max(30).required()
});

const especieSchema = Joi.object({
  nombre: Joi.string().max(30).required(),
  tipo: Joi.string().hex().length(24).required()
});

const loteSchema = Joi.object({
  numeroCajas: Joi.number().integer().min(0).required(),
  precioKgSalida: Joi.number().min(0).required(),
  fecha: Joi.date().required()
});

const compraSchema = Joi.object({
  lote: Joi.string().hex().length(24).required(),
  especie: Joi.string().hex().length(24).required(),
  tipo: Joi.string().hex().length(24).required(),
  comprador: Joi.string().hex().length(24).required(),
  precioTotal: Joi.number().min(0).required(),
  fecha: Joi.date().required()
});

module.exports = {
  loginSchema,
  compradorSchema,
  tipoSchema,
  especieSchema,
  loteSchema,
  compraSchema
};
