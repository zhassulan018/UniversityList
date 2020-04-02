const express = require('express');
const uniController = require('./../controllers/uniController');

const router = express.Router();

router
  .route('/')
  .get(uniController.getAllUniversities)
  .post(uniController.createUniversity);

router
  .route('/:id')
  .get(uniController.getUniversity)
  .patch(uniController.updateUniversity)
  .delete(uniController.deleteUniversity);

module.exports = router;
