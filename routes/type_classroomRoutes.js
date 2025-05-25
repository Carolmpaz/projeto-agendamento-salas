const express = require('express');
const router = express.Router();
const type_classroomController = require('../controllers/type_classroomController');

router.get('/', type_classroomController.getAllType_classroom);
router.get('/:id', type_classroomController.getType_classroomById);
router.post('/', type_classroomController.createType_classroom);
router.put('/:id', type_classroomController.updateType_classroom);
router.delete('/:id', type_classroomController.deleteType_classroom);

module.exports = router;
