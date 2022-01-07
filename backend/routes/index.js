const express = require("express");

const router = express.Router();

const customers = require('./customers')
const suppliers = require('./suppliers')
const users = require('./users')
const barangs = require('./barangs')
router.use('/customers', customers)
router.use('/suppliers', suppliers)
router.use('/users', users)
router.use('/barangs', barangs)
module.exports = router;
