import axios from 'axios'
import React, { useState, useEffect, Fragment, lazy, Suspense } from 'react'
import Swal from 'sweetalert2'
const Header = lazy(() => import('../Header'))
const SideBar = lazy(() => import('../SideBar'))
const TambahBarang = lazy(() => import('./TambahBarang'))
const CariBarang = lazy(() => import('./CariBarang'))
const EditBarang = lazy(() => import('./EditBarang'))
const MasterBarang = () => {

    const [activePage, setActivePage] = useState(0)
    const renderActivePageMasterBarang = () => {
        let pages = [
            <TambahBarang key={0} />,
            <CariBarang key={1} />,
            <EditBarang key={2} />
        ]
        return pages[activePage]
    }

    useEffect(() => {
        setActivePage(0)
    }, []);

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
                {/* <!-- navbar vertical --> */}
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
                                        <span className='d-flex align-content-between justify-content-between'>
                                            <div className="mb-2 mb-lg-0">
                                                <h2 className="mb-0  text-white">Master Barang</h2>
                                            </div>

                                        </span>
                                        <span className='d-flex align-content-between justify-content-between'>
                                            <div>
                                                <button type='button' className="btn btn-white mx-1" onClick={() => setActivePage(0)}>Tambah Barang Baru</button>
                                            </div>
                                            <div>
                                                <button type='button' className="btn btn-white mx-1" onClick={() => setActivePage(1)}>Cari & Edit Barang</button>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {renderActivePageMasterBarang()}
                        {/* <div className="row mt-10 mb-1">
                            <div className="col-lg-12">
                                <h3 className="mb-0">Cari Customer</h3>
                            </div>
                        </div> */}
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
                    </div>
                </div>
            </div>
        </Suspense>
    </Fragment>)
}

export default MasterBarang