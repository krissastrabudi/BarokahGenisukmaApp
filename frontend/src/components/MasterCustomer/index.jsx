import React, { useState, useEffect, lazy, Suspense, Fragment } from 'react'
import axios from 'axios'
import Pagination from '../Helper/Pagination'
const Header = lazy(() => import('../Header'))
const SideBar = lazy(() => import('../SideBar'))
import ModalAddEditCustomer from '../Modals/AddEditCustomer'
import Swal from 'sweetalert2'

const MasterCustomer = () => {

    const [formCustomer, setFormCustomer] = useState({
        namaCustomer: ""
    })

    const [idCustomerSelected, setIdCustomerSelected] = useState('')
    const handleFormChange = (e) => {
        setFormCustomer({
            ...formCustomer,
            [e.target.name]: e.target.value
        })
    }
    const [typeModal, setTypeModal] = useState('add')

    const [searchCriteria, setSearchCriteria] = useState('')
    const [hasilSearchCustomer, setHasilSearchCustomer] = useState([])
    const handleSearchCustomer = async (e) => {
        e.preventDefault()
        const result = await axios.get(`/api/customers?search_criteria=${searchCriteria}`, {
            headers: {
                "x-auth-token": window.localStorage.getItem("TOKENBAROGENI"),
            }
        })
        setHasilSearchCustomer(result.data)
    }

    const handleEditCustomer = (c) => {
        setTypeModal('edit')
        setFormCustomer({
            ...formCustomer,
            namaCustomer: c.nama_customer
        })
        setIdCustomerSelected(c.id_customer)
    }

    const handleDeleteCustomer = (evt, c) => {
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
                    const result = await axios.delete(`/api/customers?idCustomer=${c.id_customer}`, {
                        headers: {
                            "x-auth-token": window.localStorage.getItem("TOKENBAROGENI"),
                        }
                    })
                    Swal.fire(
                        "Sukses!",
                        result.data,
                        "success"
                    ).then(async () => {
                        handleSearchCustomer(evt)
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
    const slicedArr = hasilSearchCustomer.slice(firstIndex, lastIndex);

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`/api/customers?search_criteria=${''}`, {
                headers: {
                    "x-auth-token": window.localStorage.getItem("TOKENBAROGENI"),
                }
            })
            setHasilSearchCustomer(result.data)
        }
        getData()
    }, [])

    return (<Fragment >
        <Suspense fallback={<Fragment>
            <center>
                <div id="background-loader">
                    <div id="loader"></div>
                    <br />
                    <label htmlFor="loader" id="loaderLabel">Loading ...</label>
                </div>
            </center>
        </Fragment>}>
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
                                            <h2 className="mb-0  text-white">Master Customer</h2>
                                        </div>
                                        <div>
                                            <button type='button' className="btn btn-white" data-bs-toggle="modal" data-bs-target="#modalAddCustomer" onClick={() => { setTypeModal('add'); setIdCustomerSelected(''); setFormCustomer({ namaCustomer: "" }) }}>Tambah Customer Baru</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ModalAddEditCustomer typeModal={typeModal} formCustomer={formCustomer} handleFormChange={handleFormChange} idCustomerSelected={idCustomerSelected} handleSearchCustomer={handleSearchCustomer} />
                        </div>
                        <div className="row mt-10 mb-1">
                            <div className="col-lg-12">
                                <h3 className="mb-0">Cari Customer</h3>
                            </div>
                        </div>
                        <div className="row mb-3">
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
                        </div>
                        <div className="row">
                            <Pagination currentPage={currentPage} postPerPage={postPerPage} array={hasilSearchCustomer} setCurrentPage={setCurrentPage} showEntries={true} />
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    </Fragment>)
}

export default MasterCustomer