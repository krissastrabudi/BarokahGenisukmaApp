import axios from 'axios'
import React, { Fragment, useState } from 'react'
import Pagination from '../../Helper/Pagination'

const CariBarang = (props) => {

    const handleDetailBarang = (c) => {
        props.loadDetailBarang(c)
        props.setSelectedBarang(c)
        props.setActivePage(2)
    }


    //table pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const lastIndex = currentPage * 10;
    const firstIndex = lastIndex - 10;
    const slicedArr = props.hasilSearchBarang.slice(firstIndex, lastIndex);

    const checkTableListBarang = () => {
        //console.log(hasilSearchBarang.length);
        if (props.hasilSearchBarang.length == 0 && props.isButtonClick == true) {
            return (<Fragment>
                <tr>
                    <td colSpan={2} className='align-middle text-center'>Tidak ada barang dengan kriteria pencarian yang diinputkan</td>
                </tr>
            </Fragment>)
        }
        else if (props.hasilSearchBarang.length > 0 && props.isButtonClick == true) {
            return (slicedArr.map((c, index) => {
                return (
                    <tr key={c.id_barang}>
                        <td className='w-60'>{c.nama_barang}</td>
                        <td className='w-40 align-middle text-center' style={{ justifyContent: "space-between" }}>
                            <button className="btn btn-secondary mx-2" onClick={() => handleDetailBarang(c)}>Edit Data</button>
                        </td>
                    </tr>
                )
            })
            )
        }

    }

    return (<Fragment>
        <div className="row mt-10 mb-1">
            <div className="col-lg-12">
                <h3 className="mb-0">Cari Barang</h3>
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-lg-12">
                <form action="" onSubmit={props.handleSearchBarang}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Masukkan nama barang untuk dicari" aria-label="Masukkan nama barang" aria-describedby="button-addon2" name="searchCriteria" onChange={(e) => props.setSearchCriteria(e.target.value)} value={props.searchCriteria} />
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
                            <th className='text-center'>Nama Barang</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            checkTableListBarang()
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div className="row">
            <Pagination currentPage={currentPage} postPerPage={postPerPage} array={props.hasilSearchBarang} setCurrentPage={setCurrentPage} showEntries={true} />
        </div>
    </Fragment>)
}

export default CariBarang