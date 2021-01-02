const express = require('express');
const cors = require('cors')
require('dotenv').config();

const app = express();
//url encode + json encode
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//create router
app.use('/api/db', require('./api/router/db_router'));
app.use('/api/v1', require('./api/router/crud_router'));
app.use('/api/sum', require('./api/router/sum_router'));
app.use('/api/user', require('./api/router/user_router'));


const port = process.env.PORT || 2828;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})