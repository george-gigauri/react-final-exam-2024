const fetch = require('cross-fetch');
const Const = require('../../src/util/Const');

class UserService {

    static async getUserByUsernameAndPassword({ username, password }, onSuccess, onError) {
        let usersRes = await fetch(`${Const.SERVER_BASE_URL}/users`)
        let usersJson = await usersRes.json();

        if (usersRes.ok) {
            let usersWithUsername = usersJson.filter(u => u.username === username && u.password === password);
            if (usersWithUsername.length > 0) {
                return onSuccess(usersWithUsername[0]);
            } else {
                return onError(404, "მომხმარებელი ვერ მოიძებნა");
            }
        } else {
            return onError(usersRes.status, "ავტორიზაციის პარამეტრები არასწორია");
        }
    }

    static async findUserWithUsernameExists({ username }) {
        let usersRes = await fetch(`${Const.SERVER_BASE_URL}/users`)
        if (usersRes.ok) {
            let usersJson = await usersRes.json();
            let usersWithUsername = usersJson.filter(u => u.username === username)
            if (usersWithUsername.length > 0) {
                return true;
            }
        }

        return false;
    }

    static async createUser({ username, firstName, lastName, password }, onSuccess, onError) {
        let r = await fetch(`${Const.SERVER_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: password
            })
        });

        let rJson = await r.json();
        if (r.ok) {
            if (rJson.username === username) {
                return onSuccess(rJson);
            } else {
                return onError(500, "მოხდა გაუთვალისწინებელი შეცდომა");
            }
        } else {
            return onError(r.status, "სერვერის შეცდომა");
        }
    }
};

module.exports = UserService;