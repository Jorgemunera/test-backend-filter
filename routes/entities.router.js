const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const { filterSchema } = require('../schemas/entities.schema');

const EntitiesService = require('../services/entities.service');
const service = new EntitiesService();

const router = express.Router();

router.post(
  '/filter',
  validatorHandler(filterSchema, 'body'),
  async (req, res, next) => {
    try {
      const { startId, endId } = req.body;
      const entitiesFilteredByIdRangeAndSorted = await service.filterByIdRange(startId, endId);
      res.status(200).json(entitiesFilteredByIdRangeAndSorted);
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;
