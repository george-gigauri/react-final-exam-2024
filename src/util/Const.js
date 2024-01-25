class Const {

    // Basic
    static SERVER_PORT = 8000;
    static SERVER_BASE_URL = `http://localhost:${this.SERVER_PORT}`

    // LocalStorage Keys
    static LOCAL_STORAGE_KEY_JWT_TOKEN = "jwt";

    // Regex
    static REGEX_USERNAME = /^[a-z_.-]+$/;
    static REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    static REGEX_SCIENTIFIC_NAME = /^[A-Z][a-zA-Z ]*$/;
    static REGEX_URL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    static REGEX_500_WORDS_MAX = /^(?:\s*\S+){1,500}$/;
};

module.exports = Const;