import React from 'react'
import './LoginPage.css'

function LoginPage() {
    return (
        <>
            <div class="login-form">
                <div class="alert alert-danger" role="alert">
                    <span></span>
                </div>
                <form method="post" style={{ marginTop: "10px" }}>
                    <h2 class="text-center">ავტორიზაცია</h2>
                    <div class="form-group" style={{ marginTop: "10px" }}>
                        <input class="form-control" name="email" placeholder="ელ. ფოსტა" required="required" type="text" />
                    </div>
                    <div class="form-group" style={{ marginTop: "10px" }}>
                        <input class="form-control" name="password" placeholder="პაროლი" required="required" type="password" />
                    </div>
                    <div class="form-group" >
                        <button class="btn btn-primary btn-block" style={{ width: "100%", marginTop: "10px" }} type="submit">ავტორიზაცია</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage