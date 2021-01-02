/**
 * @used in index.js
 * @description user realed all end points
 */
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserController = require('../db/UserController');
const Response = require('../models/Response');
const Define = require('../utils/Define');
const moment = require('moment');

const router = express.Router();
/**
 * @method POST
 * @description Create User
 * @router http://localhost:2727/api/user/post/
 * @param { user_name:[admin]
            user_email:[admin@gmail.com]
            user_phone_num:[01727635394]
            user_password:[1234567]
            user_role:[admin]
            user_salary:[25000]
        }
  * @respose same as usesr +  access_token:[get as response]
  * @access public
 */
router.post('/post', (req, res) => {
    const user = req.body;
    const pass = req.body.user_password;
    const salt = bcryptjs.genSaltSync(10);
    const hashpass = bcryptjs.hashSync(pass, salt);
    user.user_password = hashpass;
    //pass word has done
    UserController.getInstance().register(user, (err, result) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.send(response);
        } else {
            //generate access token
            var expires = moment().add(1, Define.DAYS).valueOf();
            const token = getAcessToken(user.user_email, expires);
            user.user_password = "********";
            user.access_token = token;
            user.token_expirein = expires;
            user.logged_in = true;
            result.new_object = user;
            let response = new Response(200, "  User Created Successfully", result);
            res.send(response);
        }
    });
});


/**
 * @method POST
 * @description user login
 * @router http://localhost:2727/api/user/post/login
 * @param email:[admin@gmail.com],password:[1234567]
 * @access public
 */
router.post('/post/login', (req, res) => {
    //we get user email and password from req.body{email:"",password:""}
    let { email, password } = req.body;
    const user = {
        email: email
    }
    UserController.getInstance().login(user, (err, results) => {
        if (err) {
            let response = new Response(500, err.message, err);
            res.status(500).send(response);
        } else {
            if (results[0]) {
                const hashpass = results[0].user_password;
                const isValidPass = bcryptjs.compareSync(password, hashpass);
                if (isValidPass) {
                    var expires = moment().add(1, Define.DAYS).valueOf();
                    const token = getAcessToken(email, expires);
                    results[0].user_password = "********";
                    results[0].access_token = token;
                    results[0].token_expirein = expires;
                    results[0].logged_in = true;
                    let response = new Response(200, "User Logged in Successfully", results[0]);
                    res.status(200).send(response);
                } else {
                    let response = new Response(203, "Invalid Password", {});
                    res.status(203).send(response);
                }
            } else {
                let response = new Response(203, "User NOT FOUND", {});
                res.status(203).send(response);
            }
        }
    });
});

/**
 * @method PUT
 * @description user change password
 * @router go to curd router
 * @path http://localhost:2727/api/v1/put/[user_table]/[user_id]
 * @param user_password:[updated password]
 */

//  extra method ;;;;
const getAcessToken = (email, expires) => {
    return jwt.sign({ email: email }, process.env.ACCESS_SECRET, { expiresIn: expires });
}

module.exports = router;