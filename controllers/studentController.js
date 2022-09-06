const {readFileSync, writeFileSync} = require('fs');
const path = require('path');




// student data show
const allStudents = (req, res) => {
    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")))

    res.render('students/index', {
        student : students
    });
}
// Add student data 
const addStudents = (req, res) => {
    res.render('students/create');
}

// data stored
const storeStudentData = (req, res) => {

    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")))

    const { name, mail, phone, location} = req.body;

    // let last_id = 1;
    // if(student.length  > 0){
    //     last_id = student[student.length - 1 ].id + 1;
    // }

    // // create a random id
    // const randomId = Math.floor(Math.random() * 1000000) +'_'+ Date.now();

    students.push({
        id :  Date.now(),
        name : name,
        mail : mail,
        phone : phone,
        location : location,
        img : req.file ? req.file.filename : "Profile.png"
    });

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students));
    res.redirect("/")

} 

// single student
const singleStudent = (req, res) => {
    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")))
    const single = students.find( data => data.id == req.params.id);

    res.render('students/single', {
        student : single
    })

}

// edit student data
const editStudentData = (req, res) => {

     // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")))
    const editData = students.find( data => data.id == req.params.id);

    res.render('students/edit', {
        student : editData
    })

}

// update student data
const updateStudentData = (req, res) => {

    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")));
    // get update id
    const {id} = req.params;

    students[students.findIndex( data => data.id == id)] = {
        ...students[students.findIndex( data => data.id == id)],
        name : req.body.name,
        mail : req.body.mail,
        phone : req.body.phone,
        location : req.body.location
    }

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students))
    res.redirect('/')
}

// delete student data
const deleteData = (req, res) => {


    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")))

    const updatedData = students.filter( data => data.id != req.params.id);

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(updatedData));
    res.redirect("/")

}

// export modules
module.exports = {
    allStudents,
    addStudents,
    storeStudentData,
    singleStudent,
    editStudentData,
    updateStudentData,
    deleteData
}