const express = require('express')
const router = express.Router();
const { isAuthenticated } = require('../../helpers/auth')
const { autogenIdSupplier } = require('../../helpers/autogen')
const dbase = require('../../connection');

router.post('/', [isAuthenticated], async (req, res) => {
    try {
        let idSupplier = await autogenIdSupplier(req.body.formObj.namaSupplier)
        let qry = `insert into supplier values (?,?,?,?,1)`
        await dbase.executeQueryWithParam(qry, [idSupplier, req.body.formObj.namaSupplier, req.body.formObj.noTelpSupplier, req.body.formObj.emailSupplier])
        res.status(200).send('Berhasil menambahkan supplier baru!')
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.get('/', [isAuthenticated], async (req, res) => {
    try {
        let qry = `select * from supplier where upper(nama_supplier) like ? and status_supplier = 1`
        let result = await dbase.executeQueryWithParam(qry, ['%' + req.query.search_criteria.toUpperCase() + '%'])
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.put('/', [isAuthenticated], async (req, res) => {
    try {
        let qry = `update supplier set nama_supplier = ?, no_telp_supplier = ?, alamat_email_supplier = ? where id_supplier = ?`
        let result = await dbase.executeQueryWithParam(qry, [req.body.formObj.namaSupplier, req.body.formObj.noTelpSupplier, req.body.formObj.emailSupplier, req.body.idSupplierSelected])
        console.log(req.body.idSupplierSelected);
        res.status(200).send("Berhasil mengubah data supplier!")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.delete('/', [isAuthenticated], async (req, res) => {
    try {
        let qry = `update supplier set status_supplier = 0 where id_supplier = ?`
        let result = await dbase.executeQueryWithParam(qry, [req.query.idSupplier])
        res.status(200).send("Berhasil menghapus supplier!")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

module.exports = router