import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const ModalAddEditSupplier = (props) => {

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (props.typeModal == 'edit') {
            try {
                //endpoint edit
                let result = await axios.put('/api/suppliers', {
                    formObj: props.formSupplier,
                    idSupplierSelected: props.idSupplierSelected
                }, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('TOKENBAROGENI'),
                    }
                })
                Swal.fire('Sukses', result.data, 'success').then(async () => {
                    props.handleSearchSupplier(e)
                })
            } catch (error) {
                Swal.fire('Error!', error.message, 'error')
            }
        }
        else {
            try {
                let result = await axios.post('/api/suppliers', {
                    formObj: props.formSupplier
                }, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('TOKENBAROGENI'),
                    }
                })
                Swal.fire('Sukses', result.data, 'success').then(async () => {
                    props.handleSearchSupplier(e)
                })
            } catch (error) {
                Swal.fire('Error!', error.message, 'error')
            }
        }
    }

    return (<Fragment>
        <div className="modal fade" id="modalAddSupplier" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{props.typeModal == 'add' ? 'Tambah Supplier Baru' : 'Update Data Supplier'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label htmlFor="inputNama" className="form-label">Nama Supplier</label>
                                    <input type="text" className="form-control" id="inputNama" placeholder="Masukkan nama supplier" onChange={(e) => props.handleFormChange(e)} name="namaSupplier" value={props.formSupplier.namaSupplier} />

                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label htmlFor="inputTelp" className="form-label">No. Telepon Supplier</label>
                                    <input type="text" className="form-control" id="inputTelp" placeholder="Masukkan no. telp supplier"
                                        onChange={(e) => props.handleFormChange(e)} name="noTelpSupplier" value={props.formSupplier.noTelpSupplier} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label htmlFor="inputEmail" className="form-label">Alamat Email Supplier</label>
                                    <input type="email" className="form-control" id="inputEmail" placeholder="Masukkan alamat email supplier" onChange={(e) => props.handleFormChange(e)} name="emailSupplier" value={props.formSupplier.emailSupplier} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" className="btn btn-primary">{props.typeModal == 'add' ? 'Tambah' : 'Update'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Fragment>)
}

export default ModalAddEditSupplier