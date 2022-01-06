import axios from 'axios'
import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {

    const history = useHistory()

    const [formLogin, setFormLogin] = useState({
        username: "",
        password: ""
    })

    const handleFormChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            let hasil = await axios.post('/api/users/login', {
                formObj: formLogin
            })
            Swal.fire('Sukses!', 'Berhasil melakukan login', 'success').then(() => {
                window.localStorage.setItem("TOKENBAROGENI", hasil.data)
                history.push('/home')
            })

        } catch (error) {
            Swal.fire('Gagal Login!', error.response.data, 'error')
        }
    }

    return (<Fragment>
        <div style={{ backgroundColor: "#212B36" }}>
            {/* container */}
            <div className="container d-flex flex-column">
                <div className="row align-items-center justify-content-center g-0 min-vh-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
                        {/* Card */}
                        <div className="card smooth-shadow-md">
                            {/* Card body */}
                            <div className="card-body p-6">
                                <div className="mb-4">
                                    <b><h3 className='text-primary'>CV. Barokah</h3></b>
                                    <b><p className="mb-6">Login untuk melanjutkan</p></b>
                                </div>
                                {/* Form */}
                                <form onSubmit={handleLogin}>
                                    {/* Username */}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="col-form-label-lg">Username</label>
                                        <input type="text" id="username" className="form-control" name="username" placeholder="Masukkan username" required onChange={(e) => handleFormChange(e)} />
                                    </div>
                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="col-form-label-lg">Password</label>
                                        <input type="password" id="password" className="form-control" name="password" placeholder="Masukkan password" required onChange={(e) => handleFormChange(e)} />
                                    </div>
                                    <div>
                                        {/* Button */}
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </Fragment>)
}

export default Login