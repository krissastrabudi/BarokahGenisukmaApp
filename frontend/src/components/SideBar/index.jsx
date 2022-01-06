import React, { useState, useEffect, Fragment } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const SideBar = () => {
    const history = useHistory()
    return (<Fragment>
        <nav className="navbar-vertical navbar">
            <div className="nav-scroller">
                {/* <!-- Brand logo --> */}
                <button className="navbar-brand btn btn-link" style={{ maxHeight: "auto", maxWidth: "auto" }}>
                    <p style={{ color: 'white', maxHeight: "auto", maxWidth: "100%", overflowWrap: 'break-word', textAlign: "center" }} onClick={() => { history.push('/home') }}>CV. Barokah</p>

                    {/* <img src="logo.png" alt="" style={{ maxHeight: "auto", maxWidth: "100%" }} /> */}
                </button>
                {/* <!-- Navbar nav --> */}
                <ul className="navbar-nav flex-column" id="sideNavbar">
                    {/* <li className="nav-item">
                        <a className="nav-link has-arrow @@if (context.page ===  'dashboard') { active }" href="@@webRoot/index.html">
                            <i data-feather="home" className="nav-icon icon-xs me-2"></i>  Dashboard
                        </a>

                    </li> */}


                    {/* <!-- Nav item --> */}
                    <li className="nav-item">
                        <div className="navbar-heading">Master</div>
                    </li>


                    {/* <!-- Nav item --> */}
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='nav-link active' to='masterSupplier'>
                            <i className="bi bi-box-arrow-in-down icon-xs me-2"> </i> Supplier
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='nav-link active' to='masterCustomer'>
                            <i className="bi bi-people-fill icon-xs me-2"> </i> Customer
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='nav-link active' to='masterBarang'>
                            <i className="bi bi-gift icon-xs me-2"> </i> Barang
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <div className="navbar-heading">Transaksi</div>
                    </li>


                    {/* <!-- Nav item --> */}
                    <li className="nav-item">
                        <a className="nav-link has-arrow @@if (context.page_group !== 'pages') { collapsed }" href="#!">
                            <i className="bi bi-plus-circle icon-xs me-2"> </i> Barang Masuk
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link has-arrow @@if (context.page_group !== 'pages') { collapsed }" href="#!">
                            <i className="bi bi-dash-circle icon-xs me-2"> </i> Barang Keluar
                        </a>
                    </li>
                    {/* <!-- Nav item --> */}
                    {/* <li className="nav-item">
                        <a className="nav-link has-arrow @@if (context.page_group !== 'authentication') { collapsed }" href="#!" data-bs-toggle="collapse" data-bs-target="#navAuthentication" aria-expanded="false" aria-controls="navAuthentication">
                            <i data-feather="lock" className="nav-icon icon-xs me-2">
                            </i> Authentication
                        </a>
                        <div id="navAuthentication" className="collapse @@if (context.page_group === 'authentication') { show }" data-bs-parent="#sideNavbar">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link @@if (context.page === 'signin') { active }" href="@@webRoot/pages/sign-in.html"> Sign In</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link @@if (context.page === 'signup') { active } " href="@@webRoot/pages/sign-up.html"> Sign Up</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link @@if (context.page === 'forgetpassword') { active }" href="@@webRoot/pages/forget-password.html">
                                        Forget Password
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link @@if (context.page === 'layouts') { active }" href="@@webRoot/pages/layout.html">
                            <i
                                data-feather="sidebar"

                                className="nav-icon icon-xs me-2"
                            >
                            </i>
                            Layouts
                        </a>
                    </li> */}

                    {/* <!-- Nav item -->
                    <li className="nav-item">
                        <div className="navbar-heading">UI Components</div>
                    </li>

                    <!-- Nav item -->
                    <li className="nav-item">
                        <a className="nav-link has-arrow @@if (context.page === 'docs') { active }" href="@@webRoot/docs/accordions.html" >
                            <i data-feather="package" className="nav-icon icon-xs me-2" >
                            </i>  Components
                        </a>
                    </li> */}


                    {/* <li className="nav-item">
                        <a className="nav-link has-arrow @@if (context.page_group !== 'menulevel') { collapsed }" href="#!" data-bs-toggle="collapse" data-bs-target="#navMenuLevel" aria-expanded="false" aria-controls="navMenuLevel">
                            <i
                                data-feather="corner-left-down"

                                className="nav-icon icon-xs me-2"
                            >
                            </i
                            > Menu Level
                        </a>
                        <div id="navMenuLevel" className="collapse @@if (context.page_group === 'menulevel') { show }" data-bs-parent="#sideNavbar">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link has-arrow @@if (context.page === 'twolevel') { active }" href="#!" data-bs-toggle="collapse" data-bs-target="#navMenuLevelSecond" aria-expanded="false" aria-controls="navMenuLevelSecond">
                                        Two Level
                                    </a>
                                    <div id="navMenuLevelSecond" className="collapse" data-bs-parent="#navMenuLevel">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link @@if (context.page === 'navitem1') { active }" href="#!">  NavItem 1</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link @@if (context.page === 'navitem2') { active }" href="#!">  NavItem 2</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link has-arrow @@if (context.page_group !== 'threelevel') { collapsed } " href="#!" data-bs-toggle="collapse" data-bs-target="#navMenuLevelThree" aria-expanded="false" aria-controls="navMenuLevelThree">
                                        Three Level
                                    </a>
                                    <div id="navMenuLevelThree" className="collapse @@if (context.page_group === 'threelevel') { show }" data-bs-parent="#navMenuLevel">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link @@if (context.page_group !== 'navitemthree1') { collapsed }" href="#!" data-bs-toggle="collapse" data-bs-target="#navMenuLevelThreeOne" aria-expanded="false" aria-controls="navMenuLevelThreeOne">
                                                    NavItem 1
                                                </a>
                                                <div id="navMenuLevelThreeOne" className="collapse collapse @@if (context.page_group === 'navitemthree1') { show }" data-bs-parent="#navMenuLevelThree">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link @@if (context.page === 'navchilitem') { active }" href="#!">
                                                                NavChild Item 1
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link @@if (context.page === 'navitem2') { active }" href="#!">  Nav Item 2</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li> */}
                </ul>

            </div>
        </nav>
    </Fragment>)
}

export default SideBar