const express = require('express')
const router = express.Router();
const { isAuthenticated } = require('../../helpers/auth')
const { autogenIdBarang, autogenIdBarangSupplier } = require('../../helpers/autogen')
const dbase = require('../../connection');

router.post('/', [isAuthenticated], async (req, res) => {
    let connection = await dbase.getConnection();
    try {
        await connection.beginTransaction();
        let idBarang = await autogenIdBarang(req.body.namaBarang, connection)
        let qry = `insert into barang values (?,?)`
        await dbase.executeQueryWithParam(qry, [idBarang, req.body.namaBarang], 1, connection)
        for (let index = 0; index < req.body.formObj.length; index++) {
            let objSelected = req.body.formObj[index]
            let idBarangSupplier = await autogenIdBarangSupplier(connection)
            let qry = `insert into barang_supplier values(?,?,?,?,?,?,?)`
            let result = await dbase.executeQueryWithParam(qry, [idBarangSupplier, objSelected.idSupplier, idBarang, objSelected.jumlahBarang, objSelected.satuanBarang, objSelected.hargaBarang, objSelected.tanggalMasukBarang], 1, connection)
        }
        await connection.commit();
        res.status(200).send('Berhasil menambahkan barang baru!')
    } catch (error) {
        await connection.rollback();
        console.log(error);
        res.status(500).send(error)
    } finally {
        await connection.release();
    }
})

router.get('/', async (req, res) => {
    try {
        let qry = `select * from barang where upper(nama_barang) like ?`
        let result = await dbase.executeQueryWithParam(qry, ['%' + req.query.search_criteria.toUpperCase() + '%'])
        res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get('/:idBarang', async (req, res) => {
    try {
        let qry = `select * from barang_supplier where upper(id_barang)= ?`
        let result = await dbase.executeQueryWithParam(qry, [req.params.idBarang.toUpperCase()])
        res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = router