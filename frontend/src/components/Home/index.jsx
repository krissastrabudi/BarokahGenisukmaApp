import React, { useState, useEffect, lazy, Suspense, Fragment } from 'react'

const Header = lazy(() => import('../Header'))
const SideBar = lazy(() => import('../SideBar'))

const Home = () => {
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
                        <div className="row" style={{ height: "80vh" }}>
                            <div className="col-lg-12 my-auto">
                                <h2 className='text-center'>Welcome</h2>
                                <h4 className='text-center'>Gunakan navigasi di samping untuk berpindah halaman 😊</h4>
                            </div>
                        </div>
                        {/* <!-- Container fluid -->
                <div className="bg-primary pt-10 pb-21"></div>
                <div className="container-fluid mt-n22 px-6">
                <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                {/* <!-- Page header --> 
                    <div>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="mb-2 mb-lg-0">
                    <h3 className="mb-0  text-white">Projects</h3>
                    </div>
                    <div>
                    <a href="#" className="btn btn-white">Create New Project</a>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
                    {/* <!-- card -->
                        <div className="card ">
                        {/* <!-- card body -->
                            <div className="card-body">
                            {/* <!-- heading --> 
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                <h4 className="mb-0">Projects</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                                <i className="bi bi-briefcase fs-4"></i>
                                </div>
                                </div>
                                {/* <!-- project number --> 
                                    <div>
                                    <h1 className="fw-bold">18</h1>
                                    <p className="mb-0"><span className="text-dark me-2">2</span>Completed</p>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
                                    {/* <!-- card --> 
                                        <div className="card ">
                                        {/* <!-- card body --> 
                                            <div className="card-body">
                                            {/* <!-- heading --> 
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                <h4 className="mb-0">Active Task</h4>
                                                </div>
                                                <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                                                <i className="bi bi-list-task fs-4"></i>
                                                </div>
                                                </div>
                                                {/* <!-- project number --> 
                                                    <div>
                                                    <h1 className="fw-bold">132</h1>
                                                    <p className="mb-0"><span className="text-dark me-2">28</span>Completed</p>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    <div className="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
                                                    {/* <!-- card --> 
                                                        <div className="card ">
                                                        {/* <!-- card body --> 
                                                            <div className="card-body">
                                                            {/* <!-- heading --> 
                                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                                <div>
                                                                <h4 className="mb-0">Teams</h4>
                                                                </div>
                                                                <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                                                                <i className="bi bi-people fs-4"></i>
                                                                </div>
                                                                </div>
                                                                {/* <!-- project number --> 
                                                                    <div>
                                                                    <h1 className="fw-bold">12</h1>
                                                                    <p className="mb-0"><span className="text-dark me-2">1</span>Completed</p>
                                                                    </div>
                                                                    </div>
                                                                    </div>
                                                                    
                                                                    </div>
                                                                    <div className="col-xl-3 col-lg-6 col-md-12 col-12 mt-6">
                                                                    {/* <!-- card --> 
                                                                        <div className="card ">
                                {/* <!-- card body --> 
                                    <div className="card-body">
                                    {/* <!-- heading --> 
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                        <h4 className="mb-0">Productivity</h4>
                                        </div>
                                        <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                                        <i className="bi bi-bullseye fs-4"></i>
                                        </div>
                                        </div>
                                        {/* <!-- project number --> 
                                            <div>
                                            <h1 className="fw-bold">76%</h1>
                                            <p className="mb-0"><span className="text-success me-2">5%</span>Completed</p>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            
                                        </div> */}
                    </div>
                </div>
            </Fragment >
        </Suspense>
    )
}

export default Home