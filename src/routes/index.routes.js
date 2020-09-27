const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});

//==> recibe la info de la imagen al hacer click en el btn
router.post('/upload', (req, res)=>{
    res.send('uploaded');
    //atravez de req.file obtenemos los datos de la imagen que estamos subiendo, ojo el nombre de la imagen es un id unico para cada uan de lasmimagenes, ahora queremos que el nombre sea el nombre origial de la imagen y la extension original
    //arriba creamos la constante storage
    console.log(req.file);
});



module.exports = router;