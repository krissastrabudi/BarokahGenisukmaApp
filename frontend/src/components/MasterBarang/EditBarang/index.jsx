import React, { useState, Fragment, useRef, useEffect } from 'react'
import ModalSearchSupplier from '../../Modals/SearchSupplier'
import { convertToPrice } from '../../Helper/price'
import { formatDateString } from '../../Helper/date'
import Swal from 'sweetalert2'
import axios from 'axios'

const EditBarang = (props) => {

    const hrRef = useRef()

    const handleBack = async (e) => {
        props.setActivePage(1)
        props.handleSearchBarang(e)
    }

    const [selectedDetail, setSelectedDetail] = useState({
        idBarangSupplier: "",
        jumlahBarang: 0,
        satuanBarang: "",
        hargaBarang: "",
        tanggalMasukBarang: "",
    })
    const [supplierSelected, setSupplierSelected] = useState({
        idSupplier: "",
        namaSupplier: ""
    })

    const [isButtonClik, setIsButtonClick] = useState(false)
    const handleSelectBarang = (c) => {
        hrRef.current.scrollIntoView()
        setIsButtonClick(true)
        setSelectedDetail({
            idBarangSupplier: c.id_barang_supplier,
            id_barang: c.id_barang,
            jumlahBarang: c.jumlah_barang,
            satuanBarang: c.satuan_barang,
            hargaBarang: c.harga_barang,
            tanggalMasukBarang: c.tanggal_masuk_barang,
        })
        setSupplierSelected({
            idSupplier: c.id_supplier,
            namaSupplier: c.nama_supplier
        })

    }

    const handleSelectedDetailChange = (e) => {
        setSelectedDetail({
            ...selectedDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleEditBarang = async () => {
        try {
            let tempSelectedDetail = selectedDetail
            let dateTemp = formatDateString(selectedDetail.tanggalMasukBarang, 'yyyy-mm-dd')
            tempSelectedDetail.tanggalMasukBarang = dateTemp
            //console.log(tempSelectedDetail);
            let result = await axios.put(`/api/barangs/${selectedDetail.idBarangSupplier}`, {
                supplierSelected: supplierSelected,
                formObj: tempSelectedDetail
            }, {
                headers: {
                    'x-auth-token': window.localStorage.getItem('TOKENBAROGENI'),
                }
            })
            Swal.fire('Sukses!', result.data, 'success').then(() => {
                props.loadDetailBarang(selectedDetail)
                setIsButtonClick(false)
            })
        } catch (error) {
            Swal.fire("Error!", error.response, 'error')
        }
    }

    useEffect(() => {
        hrRef.current.scrollIntoView()
    }, [isButtonClik])

    return (<Fragment>
        <div className="row mt-10 mb-3">
            <div className="col-lg-12">
                <h3 className="mb-0">Edit Barang</h3>
            </div>
        </div>
        <div className="d-flex flex-row">
            <button className="btn btn-info text-white" onClick={(e) => handleBack(e)}>Kembali ke pencarian</button>
        </div>
        <div className="row mb-3">
            <div className="col-lg-12">
                <p className='col-form-label-lg my-0'>
                    Nama Barang: {props.selectedBarang.nama_barang}
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
                        props.detailBarang.map((c, index) => {
                            return (
                                <tr key={c.id_barang_supplier}>
                                    <td className='d-none'>{c.id_supplier}</td>
                                    <td>{c.nama_supplier}</td>
                                    <td>{c.jumlah_barang}</td>
                                    <td>{c.satuan_barang}</td>
                                    <td>{convertToPrice(c.harga_barang)}</td>
                                    <td>{formatDateString(c.tanggal_masuk_barang, 'dd month yyyy')}</td>
                                    <td className='align-middle text-center'><button className="btn btn-danger mx-2" onClick={() => handleSelectBarang(c)}>Edit Item Ini</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        <hr ref={hrRef} />
        {
            isButtonClik == true &&
            <Fragment>
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                    Informasi: Untuk menghapus barang, ubah stok / jumlah barang menjadi 0
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="form-group">
                        <label className="col-form-label-lg mb-0 " htmlFor="pilihSupplierMasterBarang">Pilih Supplier</label>
                        {supplierSelected.namaSupplier}
                        <button className="btn btn-secondary mx-2" data-bs-toggle="modal" data-bs-target="#modalSearchSupplier">Pilih Supplier</button>
                    </div>
                    <ModalSearchSupplier setSupplierBarang={setSupplierSelected} />
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="col-form-label-lg mb-0 " htmlFor="inputJumlahMasterBarang">Jumlah Barang</label>
                        <input type="number" id="inputJumlahMasterBarang" className="form-control" name="jumlahBarang" onChange={(e) => handleSelectedDetailChange(e)} min={"0"} value={selectedDetail.jumlahBarang} />
                    </div>
                    <div className="col-lg-6">
                        <label className="col-form-label-lg mb-0 " htmlFor="inputSatuanMasterBarang">Satuan Barang</label>
                        <input type="text" id="inputSatuanMasterBarang" className="form-control" name="satuanBarang" onChange={(e) => handleSelectedDetailChange(e)} value={selectedDetail.satuanBarang} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label className="col-form-label-lg mb-0 " htmlFor="inputHargaMasterBarang">Harga Per Barang</label>
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">Rp.</span>
                            <input type="number" className="form-control" id='inputHargaMasterBarang' placeholder="Masukkan harga per satuan barang" aria-label="harga" aria-describedby="addon-wrapping" name="hargaBarang" min={"0"} onChange={(e) => handleSelectedDetailChange(e)} value={selectedDetail.hargaBarang} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <label className="col-form-label-lg mb-0 " htmlFor="inputTanggalMasterBarang">Tangal Masuk Barang</label>
                        <input type="date" id="inputTanggalMasterBarang" className="form-control" name="tanggalMasukBarang" onChange={(e) => handleSelectedDetailChange(e)} value={formatDateString(selectedDetail.tanggalMasukBarang, 'yyyy-mm-dd')} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-12 float-end">
                        <button className="btn btn-primary float-end" type='button' onClick={() => handleEditBarang()}>Ubah Data Barang</button>
                    </div>
                </div>
            </Fragment>
        }
    </Fragment>)
}

export default EditBarang
