const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const colores = require('colors');
const uuid = require('uuid/v4');
//Initialization
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MiddleWares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
})
app.use(multer({
    storage
}).single('image'));
//Global Variables

//Routes
app.use(require('./routes/index'));
//Static Files

//Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`.yellow)
})