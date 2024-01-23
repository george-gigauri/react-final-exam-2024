class Const {

    // Basic
    static SERVER_PORT = 8000;
    static SERVER_BASE_URL = `http://localhost:${this.SERVER_PORT}`

    // LocalStorage Keys
    static LOCAL_STORAGE_KEY_JWT_TOKEN = "jwt";

    // Regex
    static REGEX_USERNAME = /^[a-z_.-]+$/;
    static REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
};

module.exports = Const;