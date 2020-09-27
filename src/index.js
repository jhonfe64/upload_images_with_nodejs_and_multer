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
    //file name me prmite configurar el nombre de las imagenes que suba, es una funcion que recibe un callback, el req, el archivo file y un callback
    filename: (req, file, cb) => {
        //como en todos los callbacks se llaan dentro de la funcion, no se quiere enviar nada por el req, entonces ponemos null, del file enviamos solo el originalname
        //cb(null, file.originalname);
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
    //le pasamos la variable storage a multer
})

//Middlewares 

//multer es un middleware por eso va antes de las rutas, osea se aplica para todas las rutas

//multer como parametrun objeto
//usamos el metodo single que recibe el name del input tipo file desde donde se va a subir la imagen
//el metodo single permite subir una imagen a la vezz
app.use(multer({
    storage: storage,
    //las imagenes se van a guardar en esta carpeta
    //la imagen se guardara en req.file que se pedra desde la ruta
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
