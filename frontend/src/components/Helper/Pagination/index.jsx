import React, { Fragment } from 'react'

const Pagination = (props) => {

    const paginate = (e, pageNumber) => {
        e.preventDefault();
        if (pageNumber == "<<") props.setCurrentPage(1);
        else if (pageNumber == ">>") props.setCurrentPage(Math.ceil(props.array.length / props.postPerPage));
        else if (pageNumber == "<") {
            props.setCurrentPage(props.currentPage - 1);
            if (props.currentPage <= 1) props.setCurrentPage(1);
        }
        else if (pageNumber == ">") {
            props.setCurrentPage(props.currentPage + 1);
            if (props.currentPage >= Math.ceil(props.array.length / props.postPerPage)) props.setCurrentPage(Math.ceil(props.array.length / props.postPerPage));
        }
        else props.setCurrentPage(pageNumber);
    }

    let pageMax = Math.ceil(props.array.length / props.postPerPage)
    const pageNumber = []
    pageNumber.push("<<")
    pageNumber.push("<")
    let ctr = 0;
    for (let i = 1; i <= pageMax; i++) {
        if (props.currentPage == 1 || props.currentPage == 2) {
            if (i < 6) pageNumber.push(i);
        }
        else if (props.currentPage == pageMax || props.currentPage == pageMax - 1) {
            if (i > pageMax - 5) pageNumber.push(i)
        }
        else {
            if (i == props.currentPage - 2) pageNumber.push(i)
            if (i == props.currentPage - 1) pageNumber.push(i)
            else if (i == props.currentPage + 2) pageNumber.push(i)
            else if (i == props.currentPage + 1) pageNumber.push(i)
            else if (i == props.currentPage) pageNumber.push(i)
        }
    }
    pageNumber.push(">")
    pageNumber.push(">>")

    return (
        <Fragment>
            <div className="row align-middle w-100 mx-0 px-0" style={{ justifyContent: "space-between" }}>
                {props.showEntries == true &&
                    <p className="my-auto pagination-custom">
                        {`Menampilkan ${props.postPerPage >= props.array.length ? props.array.length : props.currentPage != pageMax ? props.postPerPage : props.array.length % props.postPerPage} dari ${props.array.length} data`}
                    </p>
                }
                <nav className="ml-auto mr-3 mt-3 pagination-custom">
                    <ul className="pagination">
                        {
                            pageNumber.map((number) => {
                                return (
                                    <li key={number} className={props.currentPage == number ? "page-item active" : "page-item"}>
                                        <button onClick={(e) => paginate(e, number)} href="" className="page-link btn-link">
                                            {number}
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>
        </Fragment>
    );
}

export default Pagination