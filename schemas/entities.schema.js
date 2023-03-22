const Joi = require('joi');

// Propiedades de cada
const entityId = Joi.number().integer();
const name = Joi.string();
const identificationNumber = Joi.string();
const expirationDate = Joi.string();
const contactName = Joi.string();
const contactEmail = Joi.string();
const logo = Joi.string();

// Datos para filtro por rando de ID
const startId = Joi.number().integer().min(1).max(20);
const endId = Joi.number().integer().min(1).max(20);

// Schemas de validación de datos
const createSchema = Joi.object({
  name: name.required(),
  identificationNumber: identificationNumber.required(),
  expirationDate: expirationDate.required(),
  contactName: contactName.required(),
  contactEmail: contactEmail.required(),
});

const filterSchema = Joi.object({
  startId: startId.required(),
  endId: Joi.when('startId', {
    is: Joi.exist(),
    then: endId.required().min(Joi.ref('startId')),
  }),
});

module.exports = {
  createSchema,
  filterSchema,
};
