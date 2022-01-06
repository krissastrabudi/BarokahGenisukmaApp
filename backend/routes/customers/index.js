const express = require('express')
const router = express.Router();
const { isAuthenticated } = require('../../helpers/auth')
const { autogenIdCustomer } = require('../../helpers/autogen')
const dbase = require('../../connection');

router.post('/', [isAuthenticated], async (req, res) => {
    try {
        let idCustomer = await autogenIdCustomer(req.body.formObj.namaCustomer)
        let qry = `insert into customer values (?,?,1)`
        await dbase.executeQueryWithParam(qry, [idCustomer, req.body.formObj.namaCustomer])
        res.status(200).send('Berhasil menambahkan customer baru!')
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.get('/', [isAuthenticated], async (req, res) => {
    try {
        let qry = `select * from customer where upper(nama_customer) like ? and status_customer =1`
        let result = await dbase.executeQueryWithParam(qry, ['%' + req.query.search_criteria.toUpperCase() + '%'])
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.put('/', [isAuthenticated], async (req, res) => {
    try {
        let qry = `update customer set nama_customer = ? where id_customer = ?`
        let result = await dbase.executeQueryWithParam(qry, [req.body.formObj.namaCustomer, req.body.idCustomerSelected])
        res.status(200).send("Berhasil mengubah data customer!")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.delete('/', [isAuthenticated], async (req, res) => {
    try {
        let qry = `update customer set status_customer = 0 where id_customer = ?`
        let result = await dbase.executeQueryWithParam(qry, [req.query.idCustomer])
        res.status(200).send("Berhasil menghapus customer!")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

module.exports = router