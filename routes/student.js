const express = require('express');
const { allStudents, addStudents, storeStudentData, singleStudent, deleteData, editStudentData, updateStudentData, allUnverifiedStudents, verifyAccount, verifyAccountSMS, smsVerified } = require('../controllers/studentController');
const studentPhotoMulter = require('../middlewares/studentMiddleware');


// route init
const route = express.Router();

// routes
route.get('/', allStudents)
route.get('/unverified', allUnverifiedStudents)
route.post('/student/create', studentPhotoMulter, storeStudentData)
route.get('/student/create', addStudents)
route.get('/student/:id', singleStudent)

route.get('/student/edit/:id', editStudentData)

route.get('/student/verify/:token', verifyAccount)
route.get('/student/verification/:id', verifyAccountSMS)
route.post('/student/verification/:id', smsVerified)

route.post('/student/update/:id', studentPhotoMulter, updateStudentData)

route.get('/student/delete/:id', deleteData)

// export route modules
module.exports = route;