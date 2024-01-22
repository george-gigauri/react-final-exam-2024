import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IconBack from '../../images/back-arrow-icon.webp';
import './ReptileDetails.css';
import ReptileApi from '../../api/ReptileApi';

function ReptileDetails() {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        ReptileApi.fetchReptile(
            id,
            (json) => {
                setData(json);
            },
            (err) => {
                alert(err);
            }
        )
    }, []);

    const handleGoBack = () => {
        window.history.back();
    }

    return (
        <div className='container'>
            <div className='rounded-bg-main'>
                <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <div id='back_button' onClick={handleGoBack}>
                        <img src={IconBack} style={{ height: "24px" }} />
                        <span style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "5px", fontFamily: "calibri" }}>უკან</span>
                    </div>
                </div>

                {(
                    function () {
                        if (data.isEndangered) {
                            return (<div className='danger-alert' style={{ marginTop: "15px" }}>
                                წითელ წიგნში შეტანილი და გადაშენების საფრთხის ქვეშ მდგომი სახეობა.
                            </div>)
                        }
                    }
                )()}

                <div className='row' style={{ paddingTop: "15px", paddingBottom: "15px", width: "100%" }}>

                    <img id='reptile-thumbnail'
                        className='col-sm-4 col-xs-4 col-md-4'
                        src={data.imageUrl}
                        style={
                            {
                                objectFit: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "50% 50%"
                            }
                        } />

                    <div className='col-sm-4 col-xs-4 col-md-4' style={{ marginTop: "5px", textAlign: "start" }}>
                        <label style={{ fontSize: "20px", marginRight: "15px" }}><b>{data.name}</b></label>
                        {(
                            function () {
                                if (data.isVenomous) {
                                    return (
                                        <span className="badge rounded-pill bg-danger" style={{ fontSize: "15px", color: "white" }}>შხამიანი</span>
                                    )
                                } else {
                                    return (
                                        <span className="badge rounded-pill bg-success" style={{ fontSize: "15px", color: "white" }}>უშხამო</span>
                                    )
                                }
                            }
                        )()
                        }

                        <p></p>
                        <div>
                            <text>მეცნიერული სახელწოდება</text>
                            <h6>{data.scientificName}</h6>
                        </div>

                        <p></p>
                        <div>
                            <text><b>ტიპი</b></text>
                            <h6>
                                {
                                    <span className="badge bg-info" style={{ fontSize: "15px", color: "white", marginTop: "4px" }}>{
                                        data.type == "SNAKE" ? "გველი" : "ხვლიკი"
                                    }</span>
                                }
                            </h6>
                        </div>

                        <p></p>
                    </div>

                    <div className='col-sm-4 col-xs-4 col-md-4'></div>
                </div>

                <p style={{ textAlign: "start", marginTop: "25px", fontSize: "18px", fontWeight: "bold" }}>
                    აღწერა
                </p>

                <p style={{ textAlign: "start" }}>
                    {data.description}
                </p>
            </div>
        </div>
    )
}

export default ReptileDetails