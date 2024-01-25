import React, { useEffect, useState } from 'react'
import './Home.css';
import ReptileItem from '../../components/reptiles/ReptileItem';
import ReptileApi from '../../api/ReptileApi';

const itemsPerPage = 6;

function Home() {
    const [viewVisibility, setViewVisibility] = useState({ filterDropDown: false, sortDropDown: false });

    const [page, setPage] = useState(0);
    const [pages, setPageCount] = useState(0);
    const [filters, setFilters] = useState({ venomousOnly: false, endangeredOnly: false, reptileType: "ALL" });
    const [sortBy, setSortBy] = useState({ isVenomous: null, isEndangered: null, type: null });
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        ReptileApi.fetchReptilesPaging(
            {
                page: page < 0 ? 0 : page,
                pageSize: itemsPerPage,
                filters: filters,
                sortBy: sortBy
            },
            (d) => {
                setList(d.data);
                setPageCount(d.pageCount);
            },
            (error) => {
                alert(error.error);
            }
        );
    }, [page]);

    useEffect(() => {
        setPage((prevState) => prevState === 0 ? -1 : 0);
    }, [filters, sortBy]);

    // // Fetch data from fake server
    // useEffect(() => {
    //     ReptileApi.fetchReptiles(
    //         (json) => {
    //             setData(json);
    //         },
    //         (err) => {
    //             alert(err);
    //         }
    //     );
    // }, []);

    // // Set page count when data is retrieved
    // useEffect(() => {
    //     setPageCount(Math.ceil(data.length / itemsPerPage));
    //     setList(data.slice(0, itemsPerPage));
    // }, [data]);

    // // Filter listener
    // useEffect(() => {
    //     // Filtering and sorting fetched list
    //     const tempList = data.filter(i => (
    //         (filters.venomousOnly === true ? i.isVenomous === filters.venomousOnly : true) &&
    //         (filters.endangeredOnly === true ? i.isEndangered === filters.endangeredOnly : true) &&
    //         (filters.reptileType !== "ALL" ? i.type === filters.reptileType : true)
    //     )).sort((i, j) => (() => {
    //         if (sortBy.isVenomous != null) {
    //             return (sortBy.isVenomous === "ASC" ? (i.isVenomous - j.isVenomous) : (j.isVenomous - i.isVenomous));
    //         } else if (sortBy.isEndangered != null) {
    //             return (sortBy.isEndangered === "ASC" ? (i.isEndangered - j.isEndangered) : (j.isEndangered - i.isEndangered));
    //         } else if (sortBy.type != null) {
    //             return (() => {
    //                 const typeComparison = i.type.localeCompare(j.type);
    //                 return sortBy.type === "ASC" ? typeComparison : -typeComparison;
    //             })();
    //         } else {
    //             return i.id - j.id;
    //         }
    //     }
    //     )());

    //     setPageCount(Math.ceil(tempList.length / itemsPerPage));
    //     if (pages < 1) {
    //         setPage(0);
    //     }

    //     const startIndex = page * itemsPerPage;
    //     const endIndex = startIndex + itemsPerPage;
    //     const displayedData = tempList.slice(startIndex, endIndex);

    //     setList(displayedData);
    // }, [page, filters, sortBy])

    const onFilterReptileTypeClick = (type) => {
        setFilters({ ...filters, reptileType: type });
    }

    const handleDeleteItem = (id) => {
        let answer = window.confirm("ნამდვილად გსურთ წაშლა?")
        if (answer) {
            ReptileApi.deleteById(
                id,
                () => {
                    alert("ჩანაწერი წარმატებით წაიშალა!");
                    window.location.href = "/";
                },
                (error) => {
                    alert(error);
                }
            )
        }
    }

    return (
        <div className='container' style={{ paddingTop: "15px" }}>

            <div className='flex-horizontal'>
                {/* Filter dropdown */}
                <div>
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded={viewVisibility.filterDropDown}
                            onClick={() => { setViewVisibility({ ...viewVisibility, filterDropDown: !viewVisibility.filterDropDown, sortDropDown: false }) }}>
                            გაფილტვრა
                        </button>

                        {/* Venomous */}
                        <div className={viewVisibility.filterDropDown == true ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="dropdownMenuButton" style={{ right: "0" }}>
                            <a className='dropdown-item'>
                                <div className="form-check form-switch">
                                    <input onClick={() => { setFilters({ ...filters, venomousOnly: !filters.venomousOnly }); }} className="form-check-input" type="checkbox" role="switch" id="switchVenomousOnly" checked={filters.venomousOnly} />
                                    <label className="form-check-label" htmlFor="switchVenomousOnly">შხამიანები</label>
                                </div>
                            </a>

                            {/* Endangered Species */}
                            <a className='dropdown-item'>
                                <div className="form-check form-switch">
                                    <input onClick={() => { setFilters({ ...filters, endangeredOnly: !filters.endangeredOnly }); }} className="form-check-input" type="checkbox" role="switch" id="switchEndangeredOnly" checked={filters.endangeredOnly} />
                                    <label className="form-check-label" htmlFor="switchEndangeredOnly">წითელ წიგნში შეტანილი</label>
                                </div>
                            </a>

                            <div className="dropdown-divider"></div>

                            {/* Reptile Type */}
                            <h6 className="dropdown-header">ტიპი</h6>
                            <a className='dropdown-item'>
                                <div className="form-check" onClick={() => onFilterReptileTypeClick("ALL")}>
                                    <input className="form-check-input" type="radio" id="radioTypeAll" value="ALL" checked={filters.reptileType == "ALL"} />
                                    <span className="form-check-label" htmlFor="radioTypeAll" style={{ userSelect: 'none' }}>
                                        ყველა
                                    </span>
                                </div>
                                <div className="form-check" onClick={() => onFilterReptileTypeClick("SNAKE")}>
                                    <input className="form-check-input" type="radio" id="radioTypeSnakes" value="SNAKE" checked={filters.reptileType == "SNAKE"} />
                                    <span className="form-check-label" htmlFor="radioTypeSnakes" style={{ userSelect: 'none' }}>
                                        გველი
                                    </span>
                                </div>
                                <div className="form-check" onClick={() => onFilterReptileTypeClick("LIZARD")}>
                                    <input className="form-check-input" type="radio" id="radioTypeLizards" value="LIZARD" checked={filters.reptileType == "LIZARD"} />
                                    <span className="form-check-label" htmlFor="radioTypeLizards" style={{ userSelect: 'none' }}>
                                        ხვლიკი
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ width: "15px" }}></div>

                {/* Sort Dropdown */}
                <div>
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="sortDropDownButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded={viewVisibility.sortDropDown}
                            onClick={() => { setViewVisibility({ ...viewVisibility, sortDropDown: !viewVisibility.sortDropDown, filterDropDown: false }) }}>
                            სორტირება
                        </button>

                        <div className={viewVisibility.sortDropDown == true ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="sortDropDownButton" htmlFor="sortDropDownButton" style={{ right: "0" }}>
                            {/* Venomous ^ */}
                            <a className='dropdown-item' onClick={() => { setSortBy({ isVenomous: "ASC" }) }}>
                                <label className="form-check-label">შხამიანი ↾</label>
                            </a>

                            {/* Venomous v */}
                            <a className='dropdown-item' onClick={() => { setSortBy({ isVenomous: "DESC" }) }}>
                                <label className="form-check-label">შხამიანი ⇂</label>
                            </a>

                            <div className="dropdown-divider"></div>

                            {/* Endangered ^ */}
                            <a className='dropdown-item' onClick={() => { setSortBy({ isEndangered: "ASC" }) }}>
                                <label className="form-check-label">წითელ წიგნში ↾</label>
                            </a>

                            {/* Endangered v */}
                            <a className='dropdown-item' onClick={() => { setSortBy({ isEndangered: "DESC" }) }}>
                                <label className="form-check-label">წითელ წიგნში ⇂</label>
                            </a>

                            <div className="dropdown-divider"></div>

                            {/* Type ^ */}
                            <a className='dropdown-item' onClick={() => { setSortBy({ type: "ASC" }) }}>
                                <label className="form-check-label">ტიპი ↾</label>
                            </a>

                            {/* Type v */}
                            <a className='dropdown-item' onClick={() => { setSortBy({ type: "DESC" }) }}>
                                <label className="form-check-label">ტიპი ⇂</label>
                            </a>

                        </div>
                    </div>
                </div>
            </div >

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
                                onDelete={() => { handleDeleteItem(i.id) }}
                            />
                        )
                    }
                </div>
            </div>

            <footer>
                <nav aria-label="Reptile Pagination" style={{ marginTop: "15px", marginBottom: "25px" }}>
                    <ul className="pagination justify-content-center">
                        <li className={"page-item" + (page == 0 ? " disabled" : "")}><a className="page-link" onClick={() => { if (page > 0) setPage(page - 1); }}>წინა</a></li>
                        {
                            Array.from(Array(pages).keys()).map(i =>
                                <li className={i == page ? "page-item active" : "page-item"} onClick={() => setPage(i)}><a className="page-link">{i + 1}</a></li>
                            )
                        }
                        <li className={"page-item" + (page == pages - 1 ? " disabled" : "")}><a className="page-link" onClick={() => { if (page < pages - 1) setPage(page + 1); }}>შემდეგი</a></li>
                    </ul>
                </nav>
            </footer>
        </div >
    )
}

export default Home;