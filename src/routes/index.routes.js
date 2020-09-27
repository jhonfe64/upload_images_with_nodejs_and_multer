const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index');
});

//==> recibe la info de la imagen al hacer click en el btn
router.post('/upload', (req, res)=>{
    res.send('uploaded');
    console.log(req.file);
});



module.exports = router;