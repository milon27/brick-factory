const db = require('./config');
const Define = require('../utils/Define')


/**
 * @used in ../router/crud_router.js
 * @description crud operation in database
 */

class CrudController {
    constructor() {
        this.Instance;
    }
    static getInstance = () => {
        if (this.Instance == null)
            return new CrudController();
        else
            return this.Instance;
    }
    //insert into database
    insert = async (table, obj, callback) => {
        let sql = `INSERT INTO ${table} SET ?`;
        db.query(sql, obj, callback);
    }
    //update a value
    update = async (table, obj, callback) => {
        let sql = `UPDATE ${table} SET ? WHERE id = ?`;
        db.query(sql, [obj, obj.id], callback);
    }

    //get list of rows @deprecatead
    getList = async (table, callback) => {
        let sql = `SELECT * from ${table} ORDER BY id DESC`;
        db.query(sql, callback);
    }

    getAllBySeason = async (s_id, table, callback) => {
        let sql = `SELECT * from ${table} WHERE season_id=? ORDER BY id DESC`;
        db.query(sql, s_id, callback);
    }

    //get Paginate list of rows
    getPaginateList = async (page, s_id, table, callback) => {
        //implement pagination here later
        const page_size = 3;
        let skip = (page - 1) * page_size;

        let sql = `SELECT * from ${table} WHERE season_id=? ORDER BY id DESC LIMIT ? OFFSET ? `;
        db.query(sql, [s_id, page_size, skip], callback);

    }

    //get list in range
    getInRange = async (table, column, start, end, callback) => {
        let sql = `SELECT * FROM ${table} WHERE ?? BETWEEN ? AND ? ORDER BY ??`;
        db.query(sql, [column, start, end, column], callback);
    }
    //get single row
    get = async (table, id, callback) => {
        let sql = `SELECT * from ${table} where id=?`;
        db.query(sql, [id], callback);
    }
    //get with inner join(column=transection date)
    getJoinTwo = async (main_table, main_id, join_table, join_id, column, start, end, callback) => {
        let sql = `SELECT ${main_table}.*, ${join_table}.*  FROM ${main_table}
        INNER JOIN ${join_table} ON ${join_table}.${join_id}=${main_table}.${main_id} WHERE ?? BETWEEN ? AND ? ORDER BY ?? `;
        db.query(sql, [column, start, end, column], callback);
    }
    //get with inner join(no column)
    getInnerJoin = async (main_table, main_id, join_table, join_id, s_id, callback) => {
        let sql = `SELECT ${main_table}.*, ${join_table}.*  FROM ${main_table} INNER JOIN ${join_table} ON ${join_table}.${join_id}=${main_table}.${main_id} WHERE  ${main_table}.season_id=?  ORDER BY transaction_date`;
        db.query(sql, s_id, callback);
    }

    //get left join
    getLeftJoinNoRange = async (s_id, type, callback) => {
        //console.log("nmy tupe", type);
        if (type == Define.NO_TYPE) {
            let sql = `SELECT shorder_info_table.*,COALESCE(sum(brick_built_cost_table.weekly_early_bill_paid), 0) as cleared_early_amount FROM shorder_info_table LEFT JOIN brick_built_cost_table on brick_built_cost_table.shorder_id=shorder_info_table.id WHERE shorder_info_table.season_id=? GROUP by brick_built_cost_table.shorder_id,shorder_info_table.id ORDER BY shorder_info_table.id`;
            db.query(sql, s_id, callback);
        } else {

            let sql = `SELECT shorder_info_table.*,COALESCE(sum(brick_built_cost_table.weekly_early_bill_paid), 0) as cleared_early_amount FROM shorder_info_table LEFT JOIN brick_built_cost_table on brick_built_cost_table.shorder_id=shorder_info_table.id WHERE shorder_info_table.shorder_type=? AND shorder_info_table.season_id=? GROUP by brick_built_cost_table.shorder_id,shorder_info_table.id ORDER BY shorder_info_table.id`;
            db.query(sql, [type, s_id], callback);
        }

        // let sql2 = `SELECT shorder_info_table.*,COALESCE(sum(brick_built_cost_table.weekly_early_bill_paid), 0) as cleared_early_amount FROM shorder_info_table LEFT JOIN brick_built_cost_table on brick_built_cost_table.shorder_id=shorder_info_table.id where shorder_type=? GROUP by brick_built_cost_table.shorder_id ORDER BY shorder_info_table.id`;


    }

    //update season info (when add new and update existing season)
    SeasonInsert = async (id, table, obj, callback) => {
        let sql = `INSERT INTO ${table} SET ?`;
        let sql2 = `UPDATE ${table} SET active=0 WHERE id = ?`;
        db.query(sql2, id, (err, result) => {
            if (err) {
                return err;
            } else {
                db.query(sql, obj, callback);
            }
        })
    }
    //SeasonSwitch
    SeasonSwitch = async (old_id, new_id, callback) => {
        let old_sql = `UPDATE seasons_table SET active=0 WHERE id = ?`;
        let new_sql = `UPDATE seasons_table SET active=1 WHERE id = ?`;
        db.query(old_sql, old_id, (err, result) => {
            if (err) {
                return err;
            } else {
                db.query(new_sql, new_id, callback);
            }
        })
    }


}

module.exports = CrudController;