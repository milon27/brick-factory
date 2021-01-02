const db = require('./config')
class CoalController {
    constructor() {
        this.Instance;
    }
    static getInstance = () => {
        if (this.Instance == null)
            return new CoalController();
        else
            return this.Instance;
    }

    //get total 
    getTotal = async (total_amount, total_coal_weight, paid_amount, callback) => {//column is an array
        let sql = `SELECT sum(?) as sum_total_amount
        ,sum(?) as sum_total_coal_weight
        ,sum(?) sum_paid_amount
         FROM coal_cost_table WHERE transaction_date BETWEEN ? AND ? ORDER BY transaction_date`;
        db.query(sql, [columns], callback);
    }
}

module.exports = ExtraController