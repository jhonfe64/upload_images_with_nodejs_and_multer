const express = require('express');
const path = require('path');
const multer = require('multer');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');


const app = express();

app.set('port', process.env.port || 4000);
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
})


app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {
        fileSize: 1000000000000000000
    },
    fileFilter: (req, file, cb) => {
        var fileTypes = /jpeg|jpg|png|gif/;
        var mimetype = fileTypes.test(file.mimetype);
        var extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if(mimetype && extname){
            return cb(null, true);
        }
        cb('error', 'el archivo debe ser una imagen');
    }
}).single('image'));


//Routes

app.use(require('./routes/index.routes'));


//static files

app.use(express.static(path.join(__dirname, 'views')));



























app.listen(app.get('port'), function(){
    console.log('server running on port ', app.get('port'));
})
