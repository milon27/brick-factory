const db = require('./config');
class SumController {
    constructor() {
        this.Instance;
    }
    static getInstance() {
        if (this.Instance == null)
            return new SumController();
        else
            return this.Instance;
    }
    //get coal summmmm(table,colimn=?? ,value=?)
    getSum = (total_things, total_amount, total_paid, table, s_id, callback) => {
        let sql = `SELECT SUM(??) as total_things
        ,SUM(??) as total_amount
        ,SUM(??) as total_paid
        FROM ?? WHERE season_id=?`;
        db.query(sql, [total_things, total_amount, total_paid, table, s_id], callback);
    }

    getCountSum = (total_amount, total_paid, table, s_id, callback) => {
        let sql = `SELECT COUNT(id) as total_things
        ,SUM(??) as total_amount
        ,SUM(??) as total_paid
        FROM ?? WHERE season_id=?`;
        db.query(sql, [total_amount, total_paid, table, s_id], callback);
    }

}
module.exports = SumController;