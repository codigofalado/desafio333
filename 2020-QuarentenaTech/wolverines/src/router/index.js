const express = require('express');
const router = express.Router();


//O index do arquivo vai ser onde o controller vai jovar as infos
//adquiridas
router.get('/', (req, res, next) => {
    res.render("index");
});


module.exports = router;