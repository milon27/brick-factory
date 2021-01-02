// used in user_router
const db = require('./config');
class UserController {
    constructor() {
        this.Instance;
    }
    static getInstance = () => {
        if (this.Instance == null)
            return new UserController();
        else
            return this.Instance;
    }

    /**
     * @param obj{email,password}
     * @description user login with email and password
     */
    login = async (obj, callback) => {
        let sql = `SELECT * FROM user_table WHERE user_email=? `;
        db.query(sql, [obj.email], callback);
    }

    // let sql = `SELECT * FROM user_table WHERE user_email=? AND user_password=?`;
    //db.query(sql, [obj.email, obj.password], callback);

    /**
     * @param user obj{}
     * @create new user
     */
    register = async (obj, callback) => {
        let sql = `INSERT INTO user_table SET ?`;
        db.query(sql, obj, callback);
    };
}
module.exports = UserController;