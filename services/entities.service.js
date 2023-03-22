const axios = require('axios');
const boom = require('@hapi/boom');
const { config } = require('../config/config');

class EntitiesService {
  constructor() {}

  // Función que hace una petición get a una API para obtener una entidad especifica de acuerdo a su entityId
  async getEntity(entityId) {
    try {
      const entity = await axios.get(`https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/${config.env}/entity/v2.1/entities/${entityId}`);
      return entity;
    } catch (err) {
      throw boom.forbidden(err);
    }
  }

  // Función que recibe el startId y el endId del body, agrega todas las entidades en un array y luego las organiza por el nombre, en caso de no encontrar un nombre, lanzará un error
  async filterByIdRange(startId, endId) {
    let entities = [];
    let id = startId;

    for (id; id <= endId; id++) {
      const entity = await this.getEntity(id);
      entities.push(entity.data);
    }

    const verify = [...entities].findIndex((item) => item.data.name === undefined);
    if (verify > -1) {
      throw boom.notFound('Not Found - Alguna de las entidades en el rango especificado no existe');
    }

    const entitiesSortedByName = [...entities].sort((a, b) => a.data.name.localeCompare(b.data.name));

    return entitiesSortedByName;
  }
}

module.exports = EntitiesService;
