const express = require('express');
const router = express.Router();
const DbController = require('../db/DbController');
const Response = require('../models/Response');

//create db
router.get('/createdb', async (req, res) => {
    await DbController.getInstance().createDb(process.env.DB, (err, result) => {
        if (err)
            res.send(err.message);
        res.send("Database Created" + result)
    });
});


//create user talbe
router.get('/table/user_table', async (req, res) => {
    await DbController.getInstance().createUserTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "User Table Created Successfully", result);
            res.send(response);
        }
    });
});

//create season talbe
router.get('/table/seasons_table', async (req, res) => {
    await DbController.getInstance().createSeasonsTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "seasons_table Created Successfully", result);
            res.send(response);
        }
    });
});


//create coal cost table
router.get('/table/coal_cost_table', async (req, res) => {
    await DbController.getInstance().createCoalCostTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "Coil Cost Table Created Successfully", result);
            res.send(response);
        }
    });
});

//create soil cost table
router.get('/table/soil_cost_table', async (req, res) => {
    await DbController.getInstance().createSoilCostTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "Soil Cost Table Created Successfully", result);
            res.send(response);
        }
    });
});

//tax cost table
router.get('/table/tax_cost_table', async (req, res) => {
    await DbController.getInstance().createTaxCostTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "tax_cost_table Created Successfully", result);
            res.send(response);
        }
    });
});
//daily other cost table
router.get('/table/daily_other_cost_table', async (req, res) => {
    await DbController.getInstance().createDailyOtherCostTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "daily_other_cost_table Created Successfully", result);
            res.send(response);
        }
    });
});

//land lord list
router.get('/table/land_loard_list_table', async (req, res) => {
    await DbController.getInstance().createLandLordListTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "land_loard_list_table Created Successfully", result);
            res.send(response);
        }
    });
});
//land lord cost
router.get('/table/land_loard_cost_table', async (req, res) => {
    await DbController.getInstance().createLandLordCostTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "land_loard_cost_table Created Successfully", result);
            res.send(response);
        }
    });
});

//staff list
router.get('/table/staff_list_table', async (req, res) => {
    await DbController.getInstance().createStaffListTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "staff_list_table Created Successfully", result);
            res.send(response);
        }
    });
});
router.get('/table/staff_salary_table', async (req, res) => {
    await DbController.getInstance().createStaffSalaryTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "staff_list_table Created Successfully", result);
            res.send(response);
        }
    });
});

router.get('/table/labour_daily_salary_table', async (req, res) => {
    await DbController.getInstance().createLabourDailySalaryTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "labour_daily_salary_table Created Successfully", result);
            res.send(response);
        }
    });
});

router.get('/table/shorder_info_table', async (req, res) => {
    await DbController.getInstance().createShorderTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "shorder_info_table Created Successfully", result);
            res.send(response);
        }
    });
});
router.get('/table/brick_built_cost_table', async (req, res) => {
    await DbController.getInstance().createBrickBuiltCostTable((err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            let response = new Response(200, "brick_built_cost_table Created Successfully", result);
            res.send(response);
        }
    });
});



module.exports = router;