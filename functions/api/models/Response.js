class Response {
    constructor(code, message, obj) {
        this.code = code;
        this.message = message;
        this.response = obj;
    }
}

module.exports = Response;