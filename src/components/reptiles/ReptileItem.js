import React from 'react';
import './ReptileItem.css';

function ReptileItem({
    id,
    name,
    scientificName,
    isVenomous,
    imageUrl
}) {
    return (
        <div className="col-12 col-md-6 col-lg-4" style={{ marginTop: "10px" }}>

            <a href={'/reptiles/' + id} style={{ color: "black", textDecoration: "none" }}>
                <div class="card" style={{ borderRadius: "12px", padding: "15px" }}>
                    <img src={imageUrl} className="card-img-top" style={{ borderRadius: "12px" }} />
                    <div class="card-body" style={{ marginTop: "10px" }}>
                        {(
                            function () {
                                if (isVenomous) {
                                    return (
                                        <span className="badge rounded-pill bg-danger" style={{ color: "white" }}>შხამიანი</span>
                                    )
                                } else {
                                    return (
                                        <span className="badge rounded-pill bg-success" style={{ color: "white" }}>უშხამო</span>
                                    )
                                }
                            }
                        )()
                        }

                        <div className="card-body" style={{ marginTop: "5px" }}>
                            <b className="h6"><b>{name}</b></b>
                            <span className="card-text" style={{ marginTop: "3px"}}>{scientificName}</span>
                        </div>
                    </div>

                    <a href={'/reptiles/' + id + '/details'} className="btn rounded-pill btn-primary" style={{ margin: "0px 0px 5px 0px" }}>დეტალურად</a>
                </div>
            </a>
        </div>
    )
}

export default ReptileItem;