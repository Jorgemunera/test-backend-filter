const EntitiesService = require('./entities.service');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);
const {config} = require('../config/config');

describe('EntitiesService', () => {
  const service = new EntitiesService();

  afterEach(() => {
    mock.reset();
  });

  test('getEntity: debe devolver datos de entidad cuando se proporciona una entidad válida', async () => {
    const entityId = 8;
    const expectedEntityData = {
      code: 'F132',
      message: 'Data found',
      type: 'success',
      data: {
        entityId: 8,
        name: 'Exponencial Confirming',
        identificationNumber: '9005279603',
        attributeValidator: null,
        expirationDate: '2030-10-27',
        contactName: 'Anderson Franco',
        contactMail: 'anderson.franco@affirmatum.com',
      },
    };

    mock.onGet(`https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/${config.env}/entity/v2.1/entities/${entityId}`).reply(200, expectedEntityData);

    const entityData = await service.getEntity(entityId);
    expect(entityData.data).toEqual(expectedEntityData);
  });

  test('filterByIdRange: debe devolver entidades ordenadas por nombre cuando se proporcionan startId y endId válidos', async () => {
    const startId = 1;
    const endId = 3;
    const entitiesData = [
      {
        code: "F132",
        message: "Data found",
        type: "success",
        data: {
          entityId: 1,
          name: "Tuya",
          identificationNumber: "123456789",
          attributeValidator: null,
          expirationDate: "2030-10-27",
          contactName: "Ana Maria Palacio",
          contactMail: "APalacioH@tuya.com.co",
          ipAddress: "",
          logo: "",
          domain: null,
          notificationUserActivation: "{\"ENR\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"logo_entidad_tuya.png\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}],\"TRX\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}]}",
          "searchFilter": null
        },
        traceId: "835dca3e-649b-59c8-9d0b-af718eb5ac82"
      },
      {
        code: "F132",
        message: "Data found",
        type: "success",
        data: {
          entityId: 2,
          name: "Bancolombia",
          identificationNumber: "987654321",
          attributeValidator: null,
          expirationDate: "2030-10-27",
          contactName: "Mauricio Serna Florez",
          contactMail: "msflore@bancolombia.com.co",
          ipAddress: "",
          logo: "logo_entidad_bancolombia.png",
          domain: null,
          notificationUserActivation: "{\"ENR\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}],\"TRX\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}]}",
          searchFilter: {
            fieldActive: [
              "screenAction",
              "status",
              "processId",
              "processType",
              "channel"
            ],
            processType: [
              "ENR",
              "TRX",
              "ETX",
              "AUTH",
              "ENTP",
              "ETP"
            ]
          }
        },
        traceId: "724db87e-9798-536d-a762-aa3035ab15c8"
      },
      {
        code: "F132",
        message: "Data found",
        type: "success",
        data: {
          entityId: 3,
          name: "Mi Aguila",
          identificationNumber: "9008508671",
          attributeValidator: null,
          expirationDate: "2030-10-27",
          contactName: "Manuela Castro",
          contactMail: "manuela.castro@miaguila.com",
          ipAddress: "",
          logo: "",
          domain: null,
          notificationUserActivation: "{\"ENR\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}],\"TRX\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}]}",
          searchFilter: {
            fieldActive: [
              "screenAction",
              "status",
              "processId",
              "processType",
              "channel"
            ],
            processType: [
              "ENR",
              "TRX",
              "ETX",
              "AUTH",
              "ENTP",
              "ETP"
            ]
          }
        },
        traceId: "569970af-7cbb-5b69-af9a-86a381b89437"
      },
    ];

    entitiesData.forEach((entityData, index) => {
      const entityId = startId + index;
      mock.onGet(`https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/${config.env}/entity/v2.1/entities/${entityId}`).reply(200, entityData);
    });

    const sortedEntities = await service.filterByIdRange(startId, endId);
    expect(sortedEntities.map(e => e.data.name)).toEqual(['Bancolombia', 'Mi Aguila', 'Tuya']);
  });

  test('filterByIdRange: debe arrojar un error cuando no se encuentra una entidad en el rango especificado', async () => {
    const startId = 13;
    const endId = 14;
    const entitiesData = [
      {
        code: "F132",
        message: "Data found",
        type: "success",
        data: {
          entityId: 13,
          name: "Tiwala Rent SAS",
          identificationNumber: "9016041601",
          attributeValidator: null,
          expirationDate: "2030-12-31",
          contactName: "Maria Alejandra Saldarriaga Gomez",
          contactMail: "masaldar@gmail.com",
          ipAddress: "",
          logo: null,
          domain: null,
          "notificationUserActivation": "{\"ENR\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}],\"TRX\":[{\"notification\":\"email\",\"channel\":\"WEBAPP\",\"identityLevel\":0,\"templateId\":44,\"logo\":\"\",\"gif\":\"\",\"logoSuper\":\"\",\"activated\":true}]}",
          "searchFilter": null
        },
        traceId: "dd2616d6-a58d-579d-b538-32411c164ee2"
      },
      {
        code: "F133",
        message: "Data not found",
        type: "success",
        data: {

        },
        traceId: "58ba89dd-c1c8-52ef-85f5-18efcf7ab335"
      },
    ];

    entitiesData.forEach((entityData, index) => {
      const entityId = startId + index;
      mock.onGet(`https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/${config.env}/entity/v2.1/entities/${entityId}`).reply(200, entityData);
    });

    await expect(service.filterByIdRange(startId, endId)).rejects.toThrow('Not Found - Alguna de las entidades en el rango especificado no existe');
  });
});
