const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Reservations route placeholder working');
    });

module.exports = router;