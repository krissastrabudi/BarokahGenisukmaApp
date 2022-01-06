import React, { useState, useEffect, lazy, Suspense, Fragment } from 'react'
import Pagination from '../Helper/Pagination'
import axios from 'axios'
import ModalAddSupplier from '../Modals/AddEditSupplier'
import Swal from 'sweetalert2'
const Header = lazy(() => import('../Header'))
const SideBar = lazy(() => import('../SideBar'))

const MasterSupplier = () => {

    const [formSupplier, setFormSupplier] = useState({
        namaSupplier: "",
        noTelpSupplier: "",
        emailSupplier: "",
    })
    const [idSupplierSelected, setIdSupplierSelected] = useState('')

    const handleFormChange = (e) => {
        setFormSupplier({
            ...formSupplier,
            [e.target.name]: e.target.value
        })
    }
    const [typeModal, setTypeModal] = useState('add')

    const [searchCriteria, setSearchCriteria] = useState('')
    const [hasilSearchSupplier, setHasilSearchSupplier] = useState([])
    const handleSearchSupplier = async (e) => {
        e.preventDefault()
        const result = await axios.get(`/api/suppliers?search_criteria=${searchCriteria}`, {
            headers: {
                "x-auth-token": window.localStorage.getItem("TOKENBAROGENI"),
            }
        })
        setHasilSearchSupplier(result.data)
    }

    const handleEditSupplier = (c) => {
        setTypeModal('edit')
        setFormSupplier({
            ...formSupplier,
            namaSupplier: c.nama_supplier,
            noTelpSupplier: c.no_telp_supplier,
            emailSupplier: c.alamat_email_supplier,
        })
        setIdSupplierSelected(c.id_supplier)
    }

    const handleDeleteSupplier = (evt, c) => {
        Swal.fire({
            title: "Konfirmasi",
            text: "Anda tidak dapat membatalkan aksi ini",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#5cb85c',
            confirmButtonColor: '#d9534f',
            confirmButtonText: 'Ya, lakukan'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await axios.delete(`/api/suppliers?idSupplier=${c.id_supplier}`, {
                        headers: {
                            "x-auth-token": window.localStorage.getItem("TOKENBAROGENI"),
                        }
                    })
                    Swal.fire(
                        "Sukses!",
                        result.data,
                        "success"
                    ).then(async () => {
                        handleSearchSupplier(evt)
                    })
                } catch (error) {
                    Swal.fire(
                        "Error!",
                        error.message,
                        "error"
                    )
                }
            }
        })
    }

    //table pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const lastIndex = currentPage * 10;
    const firstIndex = lastIndex - 10;
    const slicedArr = hasilSearchSupplier.slice(firstIndex, lastIndex);

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`/api/suppliers?search_criteria=${''}`, {
                headers: {
                    "x-auth-token": window.localStorage.getItem("TOKENBAROGENI"),
                }
            })
            setHasilSearchSupplier(result.data)
        }
        getData()
    }, [])

    return (
        <Suspense fallback={<Fragment>
            <center>
                <div id="background-loader">
                    <div id="loader"></div>
                    <br />
                    <label htmlFor="loader" id="loaderLabel">Loading ...</label>
                </div>
            </center>
        </Fragment>}>

            <Fragment>
                <div id="db-wrapper">
                    <SideBar />
                    {/* <!-- navbar vertical -->
        @@include('partials/navbar-vertical.html', { "page": "dashboard", })
        <!-- Page content --> */}
                    <div id="page-content">
                        <Header />
                        {/* <!-- Container fluid --> */}
                        <div className="bg-primary pt-10 pb-4 mb-6"></div>
                        <div className="container-fluid mt-n14 px-6 " >
                            <div className="row mb-6">
                                <div className="col-lg-12 col-md-12 col-12">
                                    {/* <!-- Page header --> */}
                                    <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="mb-2 mb-lg-0">
                                                <h2 className="mb-0  text-white">Master Supplier</h2>
                                            </div>
                                            <div>
                                                <button type='button' className="btn btn-white" data-bs-toggle="modal" data-bs-target="#modalAddSupplier" onClick={() => { setTypeModal('add'); setIdSupplierSelected(''); setFormSupplier({ namaSupplier: "", noTelpSupplier: "", emailSupplier: "", }) }}>Tambah Supplier Baru</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ModalAddSupplier typeModal={typeModal} formSupplier={formSupplier} handleFormChange={handleFormChange} idSupplierSelected={idSupplierSelected} handleSearchSupplier={handleSearchSupplier} />
                            </div>
                            <div className="row mt-10 mb-1">
                                <div className="col-lg-12">
                                    <h3 className="mb-0">Cari Supplier</h3>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-lg-12">
                                    <form onSubmit={handleSearchSupplier}>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Masukkan nama supplier untuk dicari" aria-label="Masukkan nama supplier" aria-describedby="button-addon2" name="searchCriteria" onChange={(e) => setSearchCriteria(e.target.value)} />
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
                                                <th className='text-center'>Nama Supplier</th>
                                                <th className='text-center'>No. Telp. Supplier</th>
                                                <th className='text-center'>Alamat Email Supplier</th>
                                                <th className='text-center'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                slicedArr.map((c, index) => {
                                                    return (
                                                        <tr key={c.id_supplier}>
                                                            <td>{c.nama_supplier}</td>
                                                            <td>{c.no_telp_supplier}</td>
                                                            <td>{c.alamat_email_supplier}</td>
                                                            <td className='align-middle text-center' style={{ justifyContent: "space-between" }}>
                                                                <button className="btn btn-secondary mx-2" data-bs-toggle="modal" data-bs-target="#modalAddSupplier" onClick={() => handleEditSupplier(c)}>Edit Data</button>
                                                                <button className="btn btn-danger mx-2" onClick={(evt) => handleDeleteSupplier(evt, c)}>Hapus Supplier</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <Pagination currentPage={currentPage} postPerPage={postPerPage} array={hasilSearchSupplier} setCurrentPage={setCurrentPage} showEntries={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </Suspense>
    )
}

export default MasterSupplier