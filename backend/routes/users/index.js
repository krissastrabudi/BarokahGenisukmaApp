const express = require('express')
const router = express.Router();
const dbase = require('../../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        let qry = `select * from user where username = ?`
        let result = await dbase.executeQueryWithParam(qry, [req.body.formObj.username])
        if (result.length > 0) {
            let match = await bcrypt.compare(req.body.formObj.password, result[0].password);
            if (match == true) {
                let token = await jwt.sign({
                    username: result[0].username
                }, process.env.JWT_SECRET_KEY)
                return res.status(200).send(token)
            }
            else {
                return res.status(400).send("Password salah!")
            }
        }
        else {
            return res.status(400).send("Username tidak ditemukan!")
        }
    } catch (error) {

    }
})

module.exports = router