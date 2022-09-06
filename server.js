const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const ejsLayout = require('express-ejs-layouts');
const students = require('./routes/student')

// express init
const app = express();

// data manage 
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// environment variable
dotenv.config();
const PORT = process.env.PORT || 4000;

// EJS init
app.set('view engine', 'ejs');
app.use(ejsLayout);
app.set('layout', 'layouts/main')

// static folder
app.use(express.static('public'));

// routes
app.use(students)

// server listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgGreen.black);
})