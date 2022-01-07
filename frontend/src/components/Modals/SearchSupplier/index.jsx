import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const ModalSearchSupplier = (props) => {

    const [searchCriteria, setSearchCriteria] = useState()

    const [listSupplier, setListSupplier] = useState([])
    const [isButtonClick, setIsButtonClick] = useState(false)

    const handleSearchSupplier = async (e) => {
        e.preventDefault()
        setIsButtonClick(true)
        const result = await axios.get(`/api/suppliers?search_criteria=${searchCriteria}`, {
            headers: {
                "x-auth-token": window.localStorage.getItem("TOKENBAROGENI"),
            }
        })
        setListSupplier(result.data)
    }

    return (<Fragment>
        <div className="modal fade" id="modalSearchSupplier" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{props.typeModal == 'add' ? 'Tambah Customer Baru' : 'Update Data Customer'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSearchSupplier}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Masukkan nama supplier untuk dicari" aria-label="Masukkan nama supplier" aria-describedby="button-addon2" name="searchCriteria" onChange={(e) => setSearchCriteria(e.target.value)} />
                                <button className="btn btn-secondary" type="submit" id="button-addon2"><i className="bi bi-search"></i></button>
                            </div>
                        </form>
                        {isButtonClick == true && listSupplier.length == 0 ? <Fragment> <p className='align-middle text-center'>Tidak ada supplier dengan pencarian yang diinputkan</p> </Fragment> : isButtonClick == true && listSupplier.length > 0 &&
                            <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr className='table-secondary'>
                                            <th className='text-center'>Nama Supplier</th>
                                            <th className='text-center'>No. Telp. Supplier</th>
                                            <th className='text-center'>Alamat Email Supplier</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listSupplier.map((c, index) => {
                                                return (
                                                    <tr key={c.id_supplier}>
                                                        <td>{c.nama_supplier}</td>
                                                        <td>{c.no_telp_supplier}</td>
                                                        <td>{c.alamat_email_supplier}</td>
                                                        <td className='align-middle text-center' style={{ justifyContent: "space-between" }}>
                                                            <button className="btn btn-secondary mx-2" data-bs-dismiss="modal" onClick={() => props.setSupplierBarang({
                                                                idSupplier: c.id_supplier,
                                                                namaSupplier: c.nama_supplier
                                                            })}>Pilih Supplier</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>}

                    </div>
                </div>
            </div>
        </div>
    </Fragment>)
}

export default ModalSearchSupplier