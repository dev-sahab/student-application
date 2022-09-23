const {readFileSync, writeFileSync} = require('fs');
const path = require('path');
const verficationMailSend = require('../utility/EmailSend');
const sendVerifySMS = require('../utility/SMSsend');


// verified student data show
const allStudents = (req, res) => {
    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")));
    const verifiedData = students.filter( data => data.isVerified == true);

    res.render('students/index', {
        student : verifiedData
    });
}

// unverified student data show
const allUnverifiedStudents = (req, res) => {
    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")));
    const unverifiedData = students.filter( data => data.isVerified == false);

    res.render('students/unverified', {
        student : unverifiedData
    });
}
// Add student data 
const addStudents = (req, res) => {
    res.render('students/create');
}

// data stored
const storeStudentData = async (req, res) => {

    // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")))

    // token
    const token = Date.now() +'_'+ Math.floor(Math.random() * 1000000);
    const smsToken = Math.floor(Math.random() * 1000000);

    const { name, mail, phone, location} = req.body;

    await verficationMailSend(mail, "verify Your Account", {
        name, mail, token, phone
    })

    // sendVerifySMS(phone, `Your verification code is - ${smsToken}`);


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
        phone : phone.length <= 11 ? '+88' + phone : phone,
        location : location,
        img : req.file ? req.file.filename : "Profile.png",
        isVerified : false,
        token : token,
        smsToken : smsToken
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

    const studentImg = students[students.findIndex( data => data.id == id)].img;

    students[students.findIndex( data => data.id == id)] = {
        ...students[students.findIndex( data => data.id == id)],
        name : req.body.name,
        mail : req.body.mail,
        phone : req.body.phone,
        location : req.body.location,
        img : req.file ? req.file.filename : studentImg
    }
    console.log(req.file ? req.file.filename : studentImg);

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students))
    res.redirect('/')
}

// account verification 
const verifyAccount = (req, res) => {
    const {token} = req.params
     // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")));


    students[students.findIndex( data => data.token == token)] = {
        ...students[students.findIndex( data => data.token == token)],
        isVerified : true,
        token : "",
        smsToken : ""
    }

    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(students))
    res.redirect('/')
    
}

// sms verification 
const verifyAccountSMS = (req, res) => {
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")));

    const { id } = req.params
    const student = students.find(data => data.id == id );
    const {phone, smsToken} = student

    sendVerifySMS(phone, `Your verification code is - ${smsToken}`);

    res.render('students/verify', {
        student
    })
}

// complete sms verify
const smsVerified = (req, res) => {
    
    const {token} = req.body
     // student data
    const students = JSON.parse(readFileSync(path.join(__dirname, "../db/student.json")));


    students[students.findIndex( data => data.smsToken == token)] = {
        ...students[students.findIndex( data => data.smsToken == token)],
        isVerified : true,
        token : "",
        smsToken : ""
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
    deleteData,
    allUnverifiedStudents,
    verifyAccount,
    verifyAccountSMS,
    smsVerified
}