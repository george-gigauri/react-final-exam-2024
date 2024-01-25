import React, { useState } from 'react';
import './SignUpPage.css';
import Const from '../../../util/Const';
import AuthApi from '../../../api/AuthApi';
import UserUtil from '../../../util/UserUtil';

function SignUpPage() {

  const [error, setError] = useState(undefined);
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", username: "", password: "", repeatPassword: "" });

  const signUp = () => {
    if (validateFields()) {
      AuthApi.signUp({
        username: userInfo.username,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        password: userInfo.password
      },
        () => {
          UserUtil.logOut();
          alert("რეგისტრაცია წარმატებით დასრულდა!");
          window.location.href = "/login";
        }, (error) => {
          setError(error);
        });
    }
  }

  const validateFields = () => {
    if (userInfo.firstName === '') {
      setError("სახელის ველი ცარიელია");
      return false;
    }

    if (userInfo.lastName === '') {
      setError("გვარის ველი ცარიელია");
      return false;
    }

    if (userInfo.password !== userInfo.repeatPassword) {
      setError("პაროლები არ ემთხვევა ერთმანეთს");
      return false;
    }

    if (!Const.REGEX_USERNAME.test(userInfo.username)) {
      setError("იუზერნეიმის ფორმატი არასწორია, იუზერნეიმი უნდა შედგებოდეს პატარა ლათინური ასოებისგან და არ უნდა შეიცავდეს სიმბოლოებს გარდა შემდეგი სიმბოლოებისა: _ - .");
      return false;
    }

    if (!Const.REGEX_PASSWORD.test(userInfo.repeatPassword)) {
      setError("პაროლის ფორმატი არასწორია, პაროლი უნდა შედგებოდეს მინ. ერთი დიდი და პატარა ლათინური ასოსგან, მინ. ერთი ციფრისგან და მინ. ერთი სიმბოლოსგან. ჯამში, პაროლის სიგრძე უნდა იყოს 8 ასოზე მეტი.");
      return false;
    }

    return true;
  }

  return (
    <div className='sign_up_container'>
      {
        error !== null && error !== '' && error !== undefined ?
          <div className="alert alert-danger" role="alert">
            <span style={{ color: "red" }}>{error}</span>
          </div>
          : <div></div>
      }
      <form className='flex-vertical' style={{ width: "100%" }}>
        <div className='flex-horizontal'>
          <div className='flex-vertical' style={{ width: "50%" }}>
            <label for="inputFirstName" style={{ textAlign: "start", paddingBottom: "5px" }}>სახელი</label>
            <input type="firstname" class="form-control" id="inputFirstname" placeholder="მაგ. გიორგი" onChange={(e) => { setUserInfo({ ...userInfo, firstName: e.target.value }) }} />
          </div>

          <span style={{ width: "15px" }}></span>

          <div className='flex-vertical' style={{ width: "50%" }}>
            <label for="inputLastName" style={{ textAlign: "start", paddingBottom: "5px" }}>გვარი</label>
            <input type="lastname" class="form-control" id="inputFirstname" placeholder="მაგ. გიგაური" onChange={(e) => { setUserInfo({ ...userInfo, lastName: e.target.value }) }} />
          </div>
        </div>

        <span style={{ height: "15px" }}></span>

        <div className='flex-vertical' style={{ width: "100%" }}>
          <label for="inputUsername" style={{ textAlign: "start", paddingBottom: "5px" }}>მომხმარებლის სახელი</label>
          <input type="username" class="form-control" id="inputUsername" placeholder="მაგ. george_gigauri" onChange={(e) => { setUserInfo({ ...userInfo, username: e.target.value }) }} />
        </div>

        <span style={{ height: "15px" }}></span>

        <div className='flex-horizontal'>
          <div className='flex-vertical' style={{ width: "50%" }}>
            <label for="inputPassword" style={{ textAlign: "start", paddingBottom: "5px" }}>პაროლი</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="" onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }) }} />
          </div>

          <span style={{ width: "15px" }}></span>

          <div className='flex-vertical' style={{ width: "50%" }}>
            <label for="inputRepeatPassword" style={{ textAlign: "start", paddingBottom: "5px" }}>გაიმეორე პაროლი</label>
            <input type="password" class="form-control" id="inputRepeatPassword" placeholder="" onChange={(e) => { setUserInfo({ ...userInfo, repeatPassword: e.target.value }); }} />
          </div>
        </div>

        <div className="form-group" >
          <button className="btn btn-primary btn-block" style={{ width: "100%", marginTop: "15px" }} type="button" onClick={signUp}>რეგისტრაცია</button>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage;