const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const doctorController = require('../controller/doctorController');
const patientController = require('../controller/patientController');
const specialtyController = require('../controller/specialtyController');

router.post('/login', controller.handleLogin);

router.post('/add', controller.addUser);
router.put('/editUser', controller.editUser);
router.delete('/deleteUser', controller.deleteUser);

router.get('/allcode', controller.getAllCode);
router.get('/allUsers', controller.getAllUser);
router.get('/all-top-doctor', doctorController.getDoctorHome);

router.post('/post-info-doctor', doctorController.postInfoDoctor);
router.get('/getDetailDoctor/:doctorId', doctorController.getDetailDoctor);

router.get('/getMarkdown', doctorController.getMarkdown);
router.post('/editMarkdown', doctorController.editMarkdown);

router.post('/postScheduleDoctor', doctorController.newSchedule);

router.get('/getScheduleByDate', doctorController.getScheduleByDate);

router.post('/newBooking', patientController.newBooking);

router.post('/newSpecialty', specialtyController.createNewSpecialty);
router.get('/getAllSpecialty', specialtyController.getAllSpecialty);
router.get('/getSpecialtyById/:id', specialtyController.getSpecialtyById);

router.get('/getDoctorBySpecialty/:specialty', doctorController.getDoctorBySpecialty)

module.exports = router;