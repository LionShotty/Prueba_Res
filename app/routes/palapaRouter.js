const express = require('express');
const router = express.Router();

router.get('/bebidas', (req, res) => {
    res.send('Hola Mundo')
})

module.exports = router;