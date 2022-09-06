const express = require('express');
const { allStudents, addStudents, storeStudentData, singleStudent, deleteData, editStudentData, updateStudentData } = require('../controllers/studentController');
const studentPhotoMulter = require('../middlewares/studentMiddleware');


// route init
const route = express.Router();

// routes
route.get('/', allStudents)
route.post('/student/create', studentPhotoMulter, storeStudentData)
route.get('/student/create', addStudents)
route.get('/student/:id', singleStudent)

route.get('/student/edit/:id', editStudentData)
route.post('/student/update/:id', studentPhotoMulter, updateStudentData)

route.get('/student/delete/:id', deleteData)

// export route modules
module.exports = route;