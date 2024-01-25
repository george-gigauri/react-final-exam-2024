import React, { useEffect, useState } from 'react'
import './Home.css';
import ReptileItem from '../../components/reptiles/ReptileItem';
import ReptileApi from '../../api/ReptileApi';

const itemsPerPage = 6;

function Home() {

    const [viewVisibility, setViewVisibility] = useState({ filterDropDown: false });

    const [page, setPage] = useState(0);
    const [pages, setPageCount] = useState(0);
    const [filters, setFilters] = useState({ venomousOnly: false, endangeredOnly: false, reptileType: "ALL" });
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [error, setError] = useState(null);

    // Fetch data from fake server
    useEffect(() => {
        ReptileApi.fetchReptiles(
            (json) => {
                setError(null);
                setData(json);
            },
            (err) => {
                setError(err);
            }
        );
    }, []);

    // Set page count when data is retrieved
    useEffect(() => {
        setPageCount(Math.ceil(data.length / itemsPerPage));
        setList(data.slice(0, itemsPerPage));
    }, [data]);

    // Filter listener
    useEffect(() => {
        const tempList = data.filter(i => (
            (filters.venomousOnly === true ? i.isVenomous === filters.venomousOnly : true) &&
            (filters.endangeredOnly === true ? i.isEndangered === filters.endangeredOnly : true) &&
            (filters.reptileType !== "ALL" ? i.type === filters.reptileType : true)
        ));

        setPageCount(Math.ceil(tempList.length / itemsPerPage));
        if (pages < 1) {
            setPage(0);
        }

        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const displayedData = tempList.slice(startIndex, endIndex);

        setList(displayedData);
    }, [page, filters])

    const onFilterVenomousOnlyClick = () => {
        setFilters({ ...filters, venomousOnly: !filters.venomousOnly });
    }

    const onFilterEndangeredOnlyClick = () => {
        setFilters({ ...filters, endangeredOnly: !filters.endangeredOnly });
    }

    const onFilterReptileTypeClick = (type) => {
        setFilters({ ...filters, reptileType: type });
    }

    const handlePageChange = (p) => {
        setPage(p);
    }

    const handleClickNextPage = () => {
        if (page < pages - 1) setPage(page + 1);
    }

    const handleClickPreviousPage = () => {
        if (page > 0) setPage(page - 1);
    }

    return (
        <div className='container' style={{ paddingTop: "15px" }}>

            {/* Filter dropdown */}
            <div style={{ width: "100%" }}>
                <div className="dropdown" style={{ marginLeft: "90%" }}>
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={viewVisibility.filterDropDown}
                        onClick={() => { setViewVisibility({ filterDropDown: !viewVisibility.filterDropDown }) }}>
                        გაფილტვრა
                    </button>

                    {/* Venomous */}
                    <div className={viewVisibility.filterDropDown == true ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="dropdownMenuButton" style={{ right: "0" }}>
                        <a className='dropdown-item'>
                            <div className="form-check form-switch">
                                <input onClick={onFilterVenomousOnlyClick} className="form-check-input" type="checkbox" role="switch" id="switchVenomousOnly" checked={filters.venomousOnly} />
                                <label className="form-check-label" for="switchVenomousOnly">შხამიანები</label>
                            </div>
                        </a>

                        {/* Endangered Species */}
                        <a className='dropdown-item'>
                            <div className="form-check form-switch">
                                <input onClick={onFilterEndangeredOnlyClick} className="form-check-input" type="checkbox" role="switch" id="switchEndangeredOnly" checked={filters.endangeredOnly} />
                                <label className="form-check-label" for="switchEndangeredOnly">წითელ წიგნში შეტანილი</label>
                            </div>
                        </a>

                        <div className="dropdown-divider"></div>

                        {/* Reptile Type */}
                        <h6 className="dropdown-header">ტიპი</h6>
                        <a className='dropdown-item'>
                            <div className="form-check" onClick={() => onFilterReptileTypeClick("ALL")}>
                                <input className="form-check-input" type="radio" name="exampleRadios" id="radioTypeAll" value="ALL" checked={filters.reptileType == "ALL"} />
                                <label className="form-check-label" for="radioTypeAll">
                                    ყველა
                                </label>
                            </div>
                            <div className="form-check" onClick={() => onFilterReptileTypeClick("SNAKE")}>
                                <input className="form-check-input" type="radio" name="exampleRadios" id="radioTypeSnakes" value="SNAKE" checked={filters.reptileType == "SNAKE"} />
                                <label className="form-check-label" for="radioTypeSnakes">
                                    გველი
                                </label>
                            </div>
                            <div className="form-check" onClick={() => onFilterReptileTypeClick("LIZARD")}>
                                <input className="form-check-input" type="radio" name="exampleRadios" id="radioTypeLizards" value="LIZARD" checked={filters.reptileType == "LIZARD"} />
                                <label className="form-check-label" for="radioTypeLizards">
                                    ხვლიკი
                                </label>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className='horizontal-paddings-15'>
                <div className='row justify-content-start'>
                    {
                        list.map(i =>
                            <ReptileItem
                                key={i.id}
                                id={i.id}
                                name={i.name}
                                scientificName={i.scientificName}
                                isVenomous={i.isVenomous}
                                type={i.type}
                                imageUrl={i.imageUrl}
                            />
                        )
                    }
                </div>
            </div>

            <footer>
                <nav aria-label="Reptile Pagination" style={{ marginTop: "15px", marginBottom: "25px" }}>
                    <ul className="pagination justify-content-center">
                        <li className={"page-item" + (page == 0 ? " disabled" : "")}><a className="page-link" href="#" onClick={handleClickPreviousPage}>წინა</a></li>
                        {
                            Array.from(Array(pages).keys()).map(i =>
                                <li className={i == page ? "page-item active" : "page-item"} onClick={() => handlePageChange(i)}><a className="page-link" href="#">{i + 1}</a></li>
                            )
                        }
                        <li className={"page-item" + (page == pages - 1 ? " disabled" : "")}><a className="page-link" href="#" onClick={handleClickNextPage}>შემდეგი</a></li>
                    </ul>
                </nav>
            </footer>
        </div>
    )
}

export default Home;