const express = require('express');
const morgan = require('morgan');
const { userRouter, categoryRouter, productRouter, orderRouter } = require('./routers/routers');
const { handleError } = require('./middlewares/error-handler');

const app = express();

require('./database/db')();
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.send("API running")
})

APIRouter = express.Router();
APIRouter.get('', (req, res)=>{
    res.json({"Message" : "API is running"});
})

app.use('/api', APIRouter);
APIRouter.use('/users', userRouter);
APIRouter.use('/products', productRouter);
APIRouter.use('/categories', categoryRouter);
APIRouter.use('/orders', orderRouter);

app.use(handleError);

module.exports = {app};