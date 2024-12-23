
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthROuter = require('./Routes/AuthRouter.js');
const ProductRouter = require('./Routes/ProductRouter.js');

require('dotenv').config();
require('./models/db.js');


app.use(bodyParser.json());
app.use(cors())
app.use('/auth', AuthROuter)
app.use('/products', ProductRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})