import React, { useState, Fragment } from 'react'

const EditBarang = () => {

    return (<Fragment>
        <div className="row mt-10 mb-1">
            <div className="col-lg-12">
                <h3 className="mb-0">Edit Barang</h3>
            </div>
        </div>
        {/* <div className="row mb-3">
                            <div className="col-lg-12">
                                <form action="" onSubmit={handleSearchCustomer}>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Masukkan nama customer untuk dicari" aria-label="Masukkan nama customer" aria-describedby="button-addon2" name="searchCriteria" onChange={(e) => setSearchCriteria(e.target.value)} />
                                        <button className="btn btn-secondary" type="submit" id="button-addon2"><i className="bi bi-search"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered">
                                    <thead>
                                        <tr className='table-secondary'>
                                            <th className='text-center'>Nama Customer</th>
                                            <th className='text-center'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            slicedArr.map((c, index) => {
                                                return (
                                                    <tr key={c.id_customer}>
                                                        <td className='w-60'>{c.nama_customer}</td>
                                                        <td className='w-40 align-middle text-center' style={{ justifyContent: "space-between" }}>
                                                            <button className="btn btn-secondary mx-2" data-bs-toggle="modal" data-bs-target="#modalAddCustomer" onClick={() => handleEditCustomer(c)}>Edit Data</button>
                                                            <button className="btn btn-danger mx-2" onClick={(evt) => handleDeleteCustomer(evt, c)}>Hapus Customer</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
    </Fragment>)
}

export default EditBarang
