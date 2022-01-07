import React, { useState, Fragment } from 'react'
import Swal from 'sweetalert2'
import ModalSearchSupplier from '../../Modals/SearchSupplier'
import { convertToPrice } from '../../Helper/price'
import { formatDateString } from '../../Helper/date'
import axios from 'axios'
const TambahBarang = () => {

    const [namaBarang, setNamaBarang] = useState('')
    const [supplierBarang, setSupplierBarang] = useState({
        idSupplier: "",
        namaSupplier: ""
    })
    const [detailBarang, setDetailBarang] = useState({
        idSupplier: "",
        namaSupplier: "",
        jumlahBarang: 0,
        satuanBarang: "",
        hargaBarang: "",
        tanggalMasukBarang: "",
    })

    const handleDetailBarangChange = (e) => {
        setDetailBarang({
            ...detailBarang,
            [e.target.name]: e.target.value
        })
    }

    const [arrHargaJumlahSatuan, setArrHargaJumlahSatuan] = useState([])

    const handleAddArrHargaJumlahSatuan = () => {
        if (detailBarang.jumlahBarang == 0 || detailBarang.satuanBarang == "" || detailBarang.hargaBarang == "") {
            Swal.fire('Error!', 'Terdapat field yang belum diisi!', 'error')
        }
        // else if (supplierBarang.idSupplier == "") {
        //     Swal.fire('Error!', 'Supplier belum dipilih!', 'error')
        // }
        else {
            let tempDetailBarang = Object.assign(detailBarang, supplierBarang)
            //console.log(tempDetailBarang);
            let tempArrHargaJumlahSatuan = arrHargaJumlahSatuan.concat(detailBarang)
            //console.log(tempArrHargaJumlahSatuan);
            setArrHargaJumlahSatuan(tempArrHargaJumlahSatuan)
            setDetailBarang({
                idSupplier: "",
                namaSupplier: "",
                jumlahBarang: 0,
                satuanBarang: "",
                hargaBarang: "",
                tanggalMasukBarang: ""
            })
        }
    }

    const handleDeleteFromArr = (idx) => {
        Swal.fire({
            title: "Hapus dari tabel?",
            text: "Anda tidak dapat membatalkan aksi ini",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#5cb85c',
            confirmButtonColor: '#d9534f',
            confirmButtonText: 'Ya, lakukan'
        }).then((result) => {
            if (result.isConfirmed) {
                let tempArrHargaJumlahSatuan = [...arrHargaJumlahSatuan]
                tempArrHargaJumlahSatuan.splice(idx, 1)
                setArrHargaJumlahSatuan(tempArrHargaJumlahSatuan)
            }
        })
    }

    const handleAddBarang = async (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Konfirmasi",
            text: "Tambahkan barang baru? Pastikan data yang diinputkan sudah benar",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#5cb85c',
            confirmButtonColor: '#d9534f',
            confirmButtonText: 'Ya, lakukan'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    let result = await axios.post('/api/barangs', {
                        namaBarang: namaBarang,
                        formObj: arrHargaJumlahSatuan
                    }, {
                        headers: {
                            'x-auth-token': window.localStorage.getItem('TOKENBAROGENI'),
                        }
                    })
                    Swal.fire('Sukses!', result.data, 'success').then(() => {
                        setArrHargaJumlahSatuan([])
                    })
                } catch (error) {
                    Swal.fire('Error!', error.response, 'error')
                }
            }
        })
    }

    return (<Fragment>
        <div className="row mt-10 mb-1">
            <div className="col-lg-12">
                <h3 className="mb-0">Tambah Barang</h3>
            </div>
        </div>
        <div className="row mb-3">
            <div className="modal-body">
                <div className="form-group">
                    <label className="col-form-label-lg mb-0 " htmlFor="inputNamaMasterBarang">Nama Barang</label>
                    <input className="form-control" id="inputNamaMasterBarang" type="text" placeholder="Masukkan nama barang" name="namaBarang" required={true} onChange={(e) => setNamaBarang(e.target.value)} />
                </div>

            </div>
        </div>
        <hr />
        <div className="row mt-3 mb-3">
            <div className="form-group">
                <label className="col-form-label-lg mb-0 " htmlFor="pilihSupplierMasterBarang">Pilih Supplier</label>
                {supplierBarang.idSupplier == "" ? "Belum ada supplier dipilih" : supplierBarang.namaSupplier}
                <button className="btn btn-secondary mx-2" data-bs-toggle="modal" data-bs-target="#modalSearchSupplier">Pilih Supplier</button>
            </div>
            <ModalSearchSupplier setSupplierBarang={setSupplierBarang} />
        </div>
        <div className="row mb-3">
            <div className="col-lg-6">
                <label className="col-form-label-lg mb-0 " htmlFor="inputJumlahMasterBarang">Jumlah Barang</label>
                <input type="number" id="inputJumlahMasterBarang" className="form-control" name="jumlahBarang" onChange={(e) => handleDetailBarangChange(e)} min={"0"} value={detailBarang.jumlahBarang} />
            </div>
            <div className="col-lg-6">
                <label className="col-form-label-lg mb-0 " htmlFor="inputSatuanMasterBarang">Satuan Barang</label>
                <input type="text" id="inputSatuanMasterBarang" className="form-control" name="satuanBarang" onChange={(e) => handleDetailBarangChange(e)} value={detailBarang.satuanBarang} />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-6">
                <label className="col-form-label-lg mb-0 " htmlFor="inputHargaMasterBarang">Harga Per Barang</label>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Rp.</span>
                    <input type="number" className="form-control" id='inputHargaMasterBarang' placeholder="Masukkan harga per satuan barang" aria-label="harga" aria-describedby="addon-wrapping" name="hargaBarang" min={"0"} onChange={(e) => handleDetailBarangChange(e)} value={detailBarang.hargaBarang} />
                </div>
            </div>
            <div className="col-lg-6">
                <label className="col-form-label-lg mb-0 " htmlFor="inputTanggalMasterBarang">Tangal Masuk Barang</label>
                <input type="date" id="inputTanggalMasterBarang" className="form-control" name="tanggalMasukBarang" onChange={(e) => handleDetailBarangChange(e)} value={detailBarang.tanggalMasukBarang} />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-12 float-end">
                <button className="btn btn-primary float-end" type='button' onClick={() => handleAddArrHargaJumlahSatuan()}>Tambah Harga & Jumlah</button>
            </div>
        </div>
        <hr />
        <div className="row mb-3">
            <div className="col-lg-12">
                <h3 className="mb-0">Rekap</h3>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-12">
                <p className='col-form-label-lg my-0'>
                    Nama Barang: {namaBarang}

                </p>
            </div>
        </div>
        <div className="table-respoonsive">
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr className='table-secondary'>
                        <th className='text-center d-none'>ID SUPPLIER</th>
                        <th className='text-center'>Nama Supplier</th>
                        <th className='text-center'>Jumlah Barang</th>
                        <th className='text-center'>Satuan Barang</th>
                        <th className='text-center'>Harga Barang</th>
                        <th className='text-center'>Tanggal Masuk Barang</th>
                        <th className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arrHargaJumlahSatuan.map((c, index) => {
                            return (
                                <tr key={index}>
                                    <td className='d-none'>{c.idSupplier}</td>
                                    <td>{c.namaSupplier}</td>
                                    <td>{c.jumlahBarang}</td>
                                    <td>{c.satuanBarang}</td>
                                    <td>{convertToPrice(c.hargaBarang)}</td>
                                    <td>{formatDateString(c.tanggalMasukBarang, 'dd month yyyy')}</td>
                                    <td className='align-middle text-center'><button className="btn btn-danger mx-2" onClick={() => handleDeleteFromArr(index)}>Hapus</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        <div className="row mb-3">
            <div className="col-lg-12 float-end">
                <button className="btn btn-primary float-end" type='button' onClick={(e) => handleAddBarang(e)}>Tambah Barang</button>
            </div>
        </div>
    </Fragment>)
}

export default TambahBarang