import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'



const Header = () => {

    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('TOKENBAROGENI');
        history.push('/')
    }

    useEffect(() => {
        let el = document.getElementById("nav-toggle")
        if (el) {
            el.addEventListener("click", function (e) {
                document.getElementById("db-wrapper").classList.toggle("toggled");
            });
        }
    }, [])

    return (<Fragment>
        <div className="header">
            {/* <!-- navbar --> */}
            <nav className="navbar-classic navbar navbar-expand-lg">
                <a id="nav-toggle" href="#"><i data-feather="menu" className="bi bi-list me-2 icon-xs text-white"></i></a>
                {/* <!--Navbar nav --> */}
                <ul className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">

                    {/* <!-- List --> */}
                    <li className="dropdown ms-2">
                        <a className="rounded-circle" href="#" role="button" id="dropdownUser"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar avatar-md avatar-indicators avatar-online">
                                <img alt="avatar" src="/avatar.png"
                                    className="rounded-circle" />
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="dropdownUser">
                            <div className="px-4 pb-0 pt-2">
                                <div className="lh-1 ">
                                    <h5 className="mb-1"> John E. Grainger</h5>
                                    {/* <a href="#" className="text-inherit fs-6">View my profile</a> */}
                                </div>
                                <div className=" dropdown-divider mt-3 mb-2"></div>
                            </div>
                            <ul className="list-unstyled">
                                {/* <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="me-2 icon-xxs dropdown-item-icon" data-feather="user"></i>Edit
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item"
                                        href="#">
                                        <i className="me-2 icon-xxs dropdown-item-icon"
                                            data-feather="activity"></i>Activity Log
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item text-primary" href="#">
                                        <i className="me-2 icon-xxs text-primary dropdown-item-icon"
                                            data-feather="star"></i>Go Pro
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="me-2 icon-xxs dropdown-item-icon"
                                            data-feather="settings"></i>Account Settings
                                    </a>
                                </li> */}
                                <li>
                                    <button className="dropdown-item btn btn-link" style={{ color: "red" }} type='button' onClick={() => handleLogout()}>
                                        <i className="bi bi-box-arrow-right icon-xxs px-2"></i>Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </Fragment>)
}

export default Header