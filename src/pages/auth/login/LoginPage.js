import React, { useContext, useState } from 'react';
import AuthApi from '../../../api/AuthApi';
import { AuthContext } from '../AuthContext';

const usernameRegex = /^[a-z_.-]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function LoginPage() {

    const { setJwtToken } = useContext(AuthContext);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    const signIn = () => {
        if (validateFields()) {
            AuthApi.signIn(
                { username: username, password: password },
                (jwt) => {
                    setJwtToken(jwt);
                    alert("წარმატებული ავტორიზაცია");
                    window.location.href = "/";
                },
                (err) => {
                    setError(err);
                    console.log("Error: " + err)
                }
            )
        }
    }

    const validateFields = () => {
        if (!usernameRegex.test(username)) {
            setError("მომხმარებლის სახელი არასწორ ფორმატშია, გამოიყენეთ პატარა (lowercase) ლათინური ასოები და მხოლოდ შემდეგი სიმბოლოები: _ - .");
            return false;
        }

        if (!passwordRegex.test(password)) {
            setError("პაროლის ფორმატი არასწორია, პაროლი უნდა შედგებოდეს მინიმუმ 6 ასოსგან, აქედან მინიმუმ 1 დიდი (UPPERCASE) და მინიმუმ 1 სიმბოლო უნდა იყოს.");
            return false;
        }

        return true;
    }

    return (
        <>
            <div className="login-form" style={{ width: "20rem", margin: "auto" }}>
                {
                    error !== null && error !== '' && error !== undefined ?
                        <div className="alert alert-danger" role="alert" style={{ marginTop: "25px" }}>
                            <span style={{ color: "red" }}>{error}</span>
                        </div>
                        : <div></div>
                }
                <form style={{ marginTop: "10px" }}>
                    <h2 className="text-center">ავტორიზაცია</h2>
                    <div className="form-group" style={{ marginTop: "10px" }}>
                        <input className="form-control" name="username" placeholder="მომხმარებლის სახელი" required="required" type="username" onChange={handleUsernameChange} />
                    </div>
                    <div className="form-group" style={{ marginTop: "10px" }}>
                        <input className="form-control" name="password" placeholder="პაროლი" required="required" type="password" onChange={handlePasswordChange} />
                    </div>
                    <div className="form-group" >
                        <button className="btn btn-primary btn-block" style={{ width: "100%", marginTop: "10px" }} type="button" onClick={signIn}>ავტორიზაცია</button>
                    </div>
                </form>

                <span style={{ width: "100%", textAlign: "center", marginTop: "35px", marginBottom: "25px" }}>ან</span>

                <button className="btn btn-secondary btn-block" style={{ width: "100%", marginTop: "10px" }} type="button" onClick={() => { window.location.href = "/signup" }}>რეგისტრაცია</button>
            </div>
        </>
    )
}

export default LoginPage;