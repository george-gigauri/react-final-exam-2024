import React, { useEffect, useState } from 'react';
import Const from '../../util/Const';
import ReptileApi from '../../api/ReptileApi';
import UserUtil from '../../util/UserUtil';

function CreateNewReptilePage() {

    const [error, setError] = useState(null);
    const [isReptileTypeChooserOpen, setReptileTypeChooserVisibility] = useState(false);
    const [reptileInfo, setReptileInfo] = useState({ name: "", scientificName: "", description: "", imageUrl: null, isEndangered: false, isVenomous: false, type: null });

    // useEffect(() => {
    //     if (!UserUtil.isSignedIn()) {
    //         window.location.href = "/login"
    //     }
    // }, []);

    const createReptile = () => {
        if (validateFields()) {
            ReptileApi.createReptile(
                {
                    name: reptileInfo.name,
                    scientificName: reptileInfo.scientificName,
                    description: reptileInfo.description,
                    imageUrl: reptileInfo.imageUrl,
                    isEndangered: reptileInfo.isEndangered,
                    isVenomous: reptileInfo.isVenomous,
                    type: reptileInfo.type
                },
                (res) => {
                    alert("ჩანაწერი წარმატებით დაემატა!");
                    window.location.href = "/";
                },
                (err) => {
                    setError(err);
                }
            );
        }
    }

    const validateFields = () => {

        if (reptileInfo.name === '') {
            setError("სახელის ველი სავალდებულოა");
            return false;
        }

        if (reptileInfo.scientificName === '') {
            setError("მეცნიერული სახელის ველის შევსება სავალდებულოა");
            return false;
        }

        if (reptileInfo.description === '') {
            setError("აღწერის ველი სავალდებულოა");
            return false;
        }

        if (!Const.REGEX_500_WORDS_MAX.test(reptileInfo.description)) {
            setError("აღწერა არ უნდა აღემატებოდეს 500 სიტყვას ჯამში");
            return false;
        }

        if (reptileInfo.imageUrl === null || reptileInfo.imageUrl === '') {
            setError("სურათის ველი სავალდებულოა");
            return false;
        }

        if (reptileInfo.type === null) {
            setError("მიუთითეთ რეპტილიის ტიპი");
            return false;
        }

        if (!Const.REGEX_SCIENTIFIC_NAME.test(reptileInfo.scientificName)) {
            setError("მეცნიერული სახელწოდება უნდა შედგებოდეს მხოლოდ ლათინური ასოებისგან, პირველი ასო კი უნდა იყოს Uppercase");
            return false;
        }

        if (!Const.REGEX_URL.test(reptileInfo.imageUrl)) {
            setError("ჩაწერეთ ნამდვილი სურათის ბმული");
            return false;
        }

        setError(null);
        return true;
    }

    return (
        <div className='container-lg' style={{ width: "35rem" }}>
            {
                (error !== null && error !== '') ?
                    <div className="alert alert-danger" style={{ marginTop: "25px" }} role="alert">
                        <span style={{ color: "red" }}>{error}</span>
                    </div>
                    : <div></div>
            }
            <form className='flex-vertical' style={{ width: "100%", marginTop: "25px" }}>
                <div className='flex-horizontal'>
                    <div className='flex-vertical' style={{ width: "50%" }}>
                        <label for="inputFirstName" style={{ textAlign: "start", paddingBottom: "5px" }}>სახელი</label>
                        <input type="firstname" className="form-control" id="inputFirstname" placeholder="მაგ. ჩვეულებრივი ანკარა" onChange={(e) => { setReptileInfo({ ...reptileInfo, name: e.target.value }) }} />
                    </div>

                    <span style={{ width: "15px" }}></span>

                    <div className='flex-vertical' style={{ width: "50%" }}>
                        <label for="inputLastName" style={{ textAlign: "start", paddingBottom: "5px" }}>გვარი</label>
                        <input type="lastname" className="form-control" id="inputFirstname" placeholder="მაგ. Natrix Natrix" onChange={(e) => { setReptileInfo({ ...reptileInfo, scientificName: e.target.value }) }} />
                    </div>
                </div>

                <span style={{ height: "15px" }}></span>

                <div className='flex-vertical' style={{ width: "100%" }}>
                    <label for="inputUsername" style={{ textAlign: "start", paddingBottom: "5px" }}>აღწერა</label>
                    <textarea type="username" className="form-control" id="inputUsername" placeholder="მაქს. 500 სიტყვა" onChange={(e) => { setReptileInfo({ ...reptileInfo, description: e.target.value }) }} />
                </div>

                <span style={{ height: "15px" }}></span>

                <div className='flex-horizontal'>
                    <div className='flex-vertical' style={{ width: "70%" }}>
                        <label for="inputPassword" style={{ textAlign: "start", paddingBottom: "5px" }}>სურათის ლინკი</label>
                        <input type="url" className="form-control" id="inputPassword" placeholder="მაგ. https://www.herpi.ge/lizard.png" onChange={(e) => { setReptileInfo({ ...reptileInfo, imageUrl: e.target.value }) }} />
                    </div>

                    <span style={{ width: "15px" }}></span>

                    <div className='flex-vertical' style={{ width: "30%" }}>
                        <label for="inputRepeatPassword" style={{ textAlign: "start", paddingBottom: "5px" }}>ტიპი</label>
                        <div className="dropdown" style={{ width: "100%" }}>
                            <button className="btn btn-warning dropdown-toggle" style={{ width: "100%" }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => { setReptileTypeChooserVisibility(!isReptileTypeChooserOpen) }}>
                                {
                                    reptileInfo.type != null ?
                                        (() => {
                                            if (reptileInfo.type === "SNAKE") {
                                                return "გველი"
                                            } else {
                                                return "ხვლიკი"
                                            }
                                        })() : "აირჩიე ტიპი"
                                }
                            </button>
                            <ul className={`dropdown-menu${isReptileTypeChooserOpen ? " show" : ""}`} style={{ marginTop: "5px" }} aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" value="SNAKE" onClick={(e) => { setReptileInfo({ ...reptileInfo, type: "SNAKE" }); setReptileTypeChooserVisibility(false); }}>გველი</a></li>
                                <li><a className="dropdown-item" value="LIZARD" onClick={(e) => { setReptileInfo({ ...reptileInfo, type: "LIZARD" }); setReptileTypeChooserVisibility(false); }}>ხვლიკი</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ height: "20px" }}></div>

                <div className="form-check" style={{ textAlign: "start", paddingTop: "5px", paddingBottom: "5px" }}>
                    <input className="form-check-input" type="checkbox" value="" id="checkIsVenomous" checked={reptileInfo.isVenomous} onClick={() => { setReptileInfo({ ...reptileInfo, isVenomous: !reptileInfo.isVenomous }) }} />
                    <label className="form-check-label" for="checkIsVenomous">
                        შხამიანი
                    </label>
                </div>

                <div className="form-check" style={{ textAlign: "start", paddingTop: "5px", paddingBottom: "5px" }}>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={reptileInfo.isEndangered} onClick={() => { setReptileInfo({ ...reptileInfo, isEndangered: !reptileInfo.isEndangered }) }} />
                    <label className="form-check-label" for="flexCheckChecked">
                        წითელ წიგნში შეტანილი
                    </label>
                </div>

                <div style={{ height: "20px" }}></div>

                <div className="form-group" >
                    <button className="btn btn-primary btn-block" style={{ width: "100%" }} type="button" onClick={createReptile}>დამატება</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewReptilePage