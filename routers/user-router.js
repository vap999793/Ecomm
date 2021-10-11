const express = require('express');
const {getUsers, saveUser, loginUser, updateUser, updateUserById} = require('../controllers/user-controller')
const { userAuthentication, adminAuthentication } = require('../middlewares/user-auth')

const userRouter = express.Router();

userRouter.get('/', adminAuthentication, getUsers);
userRouter.post('/', saveUser);
userRouter.post('/login', loginUser);
userRouter.put('/', userAuthentication, updateUser);
userRouter.put('/:user_id', adminAuthentication, updateUserById);

module.exports = {userRouter};