/**
 * @used in index.js
 * @description crud realted all end points
 */
const express = require('express');
const CrudController = require('../db/CrudController');
const router = express.Router();
const Response = require('../models/Response');
const auth = require('./middlewares/auth');
/**
 * @method POST
 * @router http://localhost:2727/api/v1/post/coal_cost_table
 * @access private(need auth)
 */
router.post('/post/:table', auth, async (req, res) => {
    const obj = req.body;
    const table = req.params.table;
    //const reqUser = req.user;
    await CrudController.getInstance().insert(table, obj, (err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            obj.id = result.insertId;
            result.new_object = obj;
            let response = new Response(200, " Inserted Successfully", result);
            res.send(response);
        }
    });
});



/**
 * @method PUT
 * @router http://localhost:2727/api/v1/get/coal_cost_table/:id
 * @description update a single cost info
 * @access private
 */
router.put('/put/:table/:id', auth, async (req, res) => {
    const id = req.params.id;
    const obj = req.body;
    obj.id = id;
    obj.updated_at = new Date();
    const table = req.params.table;

    await CrudController.getInstance().update(table, obj, (err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            result.updated_object = obj;
            let response = new Response(200, ` Data Updated Successfully`, result);
            res.send(response);
        }
    });
});


/**
 * @method GET getList @used in load land lord list
 * @router http://localhost:2727/api/v1/get/coal_cost_table
 * @description get list of coil cost list
 */
router.get('/get/:table', async (req, res) => {
    const table = req.params.table;
    await CrudController.getInstance().getList(table, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            if (results && results.length > 0) {
                let response = new Response(200, " Data list get Successfully", results);
                res.status(200).send(response);
            } else {
                let response = new Response(200, " Data list NOT FOUND", []);
                res.status(200).send(response);
            }
        }
    });
});

/**
 * @method GET getAllBySeason
 * @router http://localhost:2727/api/v1/get/coal_cost_table/s_id
 * @description get list of coil cost list
 */
router.get('/get/:table/:s_id', async (req, res) => {
    const s_id = req.params.s_id;
    const table = req.params.table;
    await CrudController.getInstance().getAllBySeason(s_id, table, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            if (results && results.length > 0) {
                let response = new Response(200, " Data list get Successfully", results);
                res.status(200).send(response);
            } else {
                let response = new Response(200, " Data list NOT FOUND", []);
                res.status(200).send(response);
            }
        }
    });
});


/**
 * @method GET getPaginateList ***************************************************
 * @router http://localhost:2727/api/v1/get/coal_cost_table/season_id
 * @description get list of coil cost list
 */
router.get('/get/:table/:s_id/:page', async (req, res) => {
    const s_id = req.params.s_id;
    const table = req.params.table;
    const page = req.params.page;
    await CrudController.getInstance().getPaginateList(page, s_id, table, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.status(500).send(response);
        } else {
            if (results && results.length > 0) {
                //console.log(results);
                let response = new Response(200, " Data list get Successfully", results);
                res.status(200).send(response);
            } else {
                let response = new Response(200, " Data list NOT FOUND", []);
                res.status(200).send(response)
            }
        }
    });
});

/**
* @method get getInRange
* @router http://localhost:2727/api/v1/get/:table/:column/:start/:end
* @example : http://localhost:2727/api/v1/get/coal_cost_table/transaction_date/2000-8-1/2000-08-10
* @access public
*/
router.get('/get/:table/:column/:start/:end', async (req, res) => {
    const table = req.params.table;
    const column = req.params.column;
    const start = req.params.start;
    const end = req.params.end;
    await CrudController.getInstance().getInRange(table, column, start, end, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            if (results[0]) {

                let response = new Response(200, " Data get Successfully", results);
                res.send(response);
            } else {
                let response = new Response(200, " Data NOT FOUND", []);
                res.send(response);
            }
        }
    });
});

/**
* @method get getJoinTwo
* @description get with two table join
* @router http://localhost:2727/api/v1/getjoin/:table1/:table1_id/:table2/:table2_id/:transection_date/:start/:end
* @example : http://localhost:2727/api/v1/getjoin/land_loard_list_table/id/land_loard_cost_table/land_lord_id/transaction_date/2000-8-25/2000-08-30
* @access public
*/
router.get('/getjoin/:main_table/:main_id/:join_table/:join_id/:column/:start/:end', async (req, res) => {

    const main_table = req.params.main_table;
    const main_id = req.params.main_id;

    const join_table = req.params.join_table;
    const join_id = req.params.join_id;

    const column = req.params.column;
    const start = req.params.start;
    const end = req.params.end;

    await CrudController.getInstance().getJoinTwo(main_table, main_id, join_table, join_id, column, start, end, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            if (results[0]) {
                let response = new Response(200, " Data get Successfully", results);
                res.send(response);
            } else {
                let response = new Response(200, " Data NOT FOUND", []);
                res.send(response);
            }
        }
    });
});

/**
* @method get
* @description get with two table join
* @router http://localhost:2727/api/v1/getjoin/:table1/:table1_id/:table2/:table2_id/:transection_date/:start/:end
* @example : http://localhost:2727/api/v1/getjoin/land_loard_list_table/id/land_loard_cost_table/land_lord_id....
* @access public
*/
router.get('/getjoin/:main_table/:main_id/:join_table/:join_id/:s_id', async (req, res) => {

    const main_table = req.params.main_table;
    const main_id = req.params.main_id;

    const join_table = req.params.join_table;
    const join_id = req.params.join_id;

    const s_id = req.params.s_id;


    await CrudController.getInstance().getInnerJoin(main_table, main_id, join_table, join_id, s_id, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            if (results[0]) {
                let response = new Response(200, " Data get Successfully", results);
                res.send(response);
            } else {
                let response = new Response(200, " Data NOT FOUND", []);
                res.send(response);
            }
        }
    });
});

/**
* @method get 
* @description get brickbuiltcost / get with two table left join
* @router http://localhost:2727/api/v1/brickbuiltcost/:type
* @example : http://localhost:2727/api/v1/brickbuiltcost/MIL_TYPE
* @access public
*/
router.get('/brickbuiltcost/:type/:s_id', async (req, res) => {

    const s_id = req.params.s_id;
    const type = req.params.type;

    await CrudController.getInstance().getLeftJoinNoRange(s_id, type, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            if (results[0]) {
                let response = new Response(200, " Data get Successfully", results);
                res.send(response);
            } else {
                let response = new Response(200, " Data NOT FOUND", []);
                res.send(response);
            }
        }
    });
});



/**
 * @method GET
 * @router http://localhost:2727/api/v1/get/coal_cost_table/:id
 * @description get single coil cost 
 */
router.get('/get/:table/:id', async (req, res) => {
    const id = req.params.id;
    const table = req.params.table;
    await CrudController.getInstance().get(table, id, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            if (results[0]) {
                let response = new Response(200, " Data get Successfully", results[0]);
                res.send(response);
            } else {
                let response = new Response(200, " Data NOT FOUND", {});
                res.send(response);
            }
        }
    });
});

/**
 * @method POST
 * @router http://localhost:2727/api/v1/season/seasons_table/1
 * @access private(need auth)
 */
router.post('/season/:table/:old_id', auth, async (req, res) => {
    const obj = req.body;
    const table = req.params.table;
    const old_id = req.params.old_id;

    await CrudController.getInstance().SeasonInsert(old_id, table, obj, (err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            obj.id = result.insertId;
            result.new_object = obj;
            let response = new Response(200, " Season Started Successfully", result);
            res.send(response);
        }
    });
});
//switch season
router.put('/switchseason/:old_id/:new_id', auth, async (req, res) => {

    const old_id = req.params.old_id;
    const new_id = req.params.new_id;

    await CrudController.getInstance().SeasonSwitch(old_id, new_id, (err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, " Season Switched Successfully", { id: new_id });
            res.status(200).send(response);
        }
    });
});



module.exports = router;