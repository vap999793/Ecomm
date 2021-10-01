const express = require('express');
require('./database/db')();
const morgan = require('morgan');
const { userRouter } = require('./routers/user-router');
const { productRouter } = require('./routers/product-router');
const { categoryRouter } = require('./routers/category-router');
const { orderRouter } = require('./routers/order-router');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.listen(3000, ()=>{
    console.log(`Server is running at PORT : 3000`);
})

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