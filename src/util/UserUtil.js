const Const = require("./Const");

class UserUtil {

    static isSignedIn() {
        return localStorage.getItem(Const.LOCAL_STORAGE_KEY_JWT_TOKEN) != null
    }

    static getCurrentToken() {
        return localStorage.getItem(Const.LOCAL_STORAGE_KEY_JWT_TOKEN);
    }

    static logOut() {
        return localStorage.removeItem(Const.LOCAL_STORAGE_KEY_JWT_TOKEN);
    }
};

export default UserUtil;