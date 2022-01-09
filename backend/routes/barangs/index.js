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
        let qry = `SELECT bs.*, s.nama_supplier FROM barang_supplier bs, supplier s WHERE s.id_supplier = bs.id_supplier and upper(bs.id_barang)= ? and bs.jumlah_barang>0`
        let result = await dbase.executeQueryWithParam(qry, [req.params.idBarang.toUpperCase()])
        res.status(200).send(result)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.put('/:idBarangSupplier', async (req, res) => {
    try {
        let qry = `update barang_supplier set id_supplier = ?, jumlah_barang = ?, satuan_barang = ?, harga_barang = ?, tanggal_masuk_barang = ? where id_barang_supplier = ?`
        let result = await dbase.executeQueryWithParam(qry, [req.body.supplierSelected.idSupplier, req.body.formObj.jumlahBarang, req.body.formObj.satuanBarang, req.body.formObj.hargaBarang, req.body.formObj.tanggalMasukBarang, req.body.formObj.idBarangSupplier])
        res.status(200).send("Berhasil mengubah data barang!")
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
})

module.exports = router