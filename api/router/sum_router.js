const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const SumController = require('./../db/SumController')

/**
 * @router /api/sum/:table/:things/:amount/:paid/:s_id
 * */
router.get('/:table/:things/:amount/:paid/:s_id', (req, res) => {
    const table = req.params.table;
    const things = req.params.things;
    const amount = req.params.amount;
    const paid = req.params.paid;
    const s_id = req.params.s_id;
    SumController.getInstance().getSum(things, amount, paid, table, s_id, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.status(500).send(response);
        } else {
            if (results && results.length > 0) {
                let response = new Response(200, " Data list get Successfully", results[0]);
                res.status(200).send(response);
            } else {
                let response = new Response(404, " Data list NOT FOUND", []);
                res.status(404).send(response);
            }
        }
    });
});


router.get('/:table/:amount/:paid/:s_id', (req, res) => {
    const table = req.params.table;
    const amount = req.params.amount;
    const paid = req.params.paid;
    const s_id = req.params.s_id;
    SumController.getInstance().getCountSum(amount, paid, table, s_id, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.status(500).send(response);
        } else {
            if (results && results.length > 0) {
                let response = new Response(200, " Data list get Successfully", results[0]);
                res.status(200).send(response);
            } else {
                let response = new Response(404, " Data list NOT FOUND", []);
                res.status(404).send(response);
            }
        }
    });
});

module.exports = router