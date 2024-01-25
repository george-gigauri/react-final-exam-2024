import Const from "../util/Const";

class AuthApi {

    static async signIn({ username, password }, onSuccess, onError) {

        try {
            const res = await fetch(Const.SERVER_BASE_URL + "/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            let result = await res.json();
            if (res.ok) {
                localStorage.setItem(Const.LOCAL_STORAGE_KEY_JWT_TOKEN, result.jwtToken);
                onSuccess(localStorage.getItem(Const.LOCAL_STORAGE_KEY_JWT_TOKEN));
            } else {
                onError(result.msg);
            }
        } catch (e) {
            onError("შეცდომა")
        }
    }

    static signUp(
        {
            username,
            email,
            firstName,
            lastName,
            password
        },
        onSuccess, onFailure
    ) {

        fetch(`${Const.SERVER_BASE_URL}/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            })
        }).then((res) => {
            let json = res.json()
            if (res.ok) {
                onSuccess(json);
            } else {
                onFailure(json.error);
            }
        }).catch((err) => {
            onFailure("შეცდომა");
        });
    }
}

export default AuthApi;