
import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const ModalAddEditCustomer = (props) => {

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (props.typeModal == 'edit') {
            try {
                //endpoint edit
                let result = await axios.put('/api/customers', {
                    formObj: props.formCustomer,
                    idCustomerSelected: props.idCustomerSelected
                }, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('TOKENBAROGENI'),
                    }
                })
                Swal.fire('Sukses', result.data, 'success').then(async () => {
                    props.handleSearchCustomer(e)
                })
            } catch (error) {
                Swal.fire('Error!', error.message, 'error')
            }

        }
        else {
            try {
                let result = await axios.post('/api/customers', {
                    formObj: props.formCustomer
                }, {
                    headers: {
                        'x-auth-token': window.localStorage.getItem('TOKENBAROGENI'),
                    }
                })
                Swal.fire('Sukses', result.data, 'success').then(async () => {
                    props.handleSearchCustomer(e)
                })
            } catch (error) {
                Swal.fire('Error!', error.message, 'error')
            }
        }
    }

    return (<Fragment>
        <div className="modal fade" id="modalAddCustomer" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{props.typeModal == 'add' ? 'Tambah Customer Baru' : 'Update Data Customer'}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="" onSubmit={handleFormSubmit}>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label htmlFor="inputNama" className="form-label">Nama Customer</label>
                                    <input type="text" className="form-control" id="inputNama" placeholder="Masukkan nama customer" onChange={(e) => props.handleFormChange(e)} name="namaCustomer" value={props.formCustomer.namaCustomer} />

                                </div>
                            </div>
                            {/* <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label htmlFor="inputTelp" className="form-label">No. Telepon Supplier</label>
                                    <input type="email" className="form-control" id="inputTelp" placeholder="Masukkan no. telp supplier" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <label htmlFor="inputEmail" className="form-label">Alamat Email Customer</label>
                                    <input type="email" className="form-control" id="inputEmail" placeholder="Masukkan alamat email supplier" />
                                </div>
                            </div> */}
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

export default ModalAddEditCustomer