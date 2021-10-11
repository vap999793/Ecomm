const Joi = require('joi');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

async function getUsers(req, res) {
    
    const user = await User.find();
    res.json({ "User": user });
}

function validateUserForRegistation(user) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(40).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        repassword: Joi.string().min(6).max(30).required(),
        phone: Joi.string().min(10).max(12),
    });
    const result = schema.validate(user);
    return result;
}

async function saveUser(req, res, next) {

    const result = validateUserForRegistation(req.body);
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const userData = result.value;

    if (userData.password != userData.repassword) {
        res.status(400);
        return next(new Error("Password didn't match"));
    }

    // check user is unique
    let isExists = await User.findOne({ email: userData.email });
    console.log(isExists);

    if (!isExists) {
        userData.password = passwordHash.generate(userData.password);
        user = await new User(userData).save();
        res.json(user);
    } else {
        res.status(400);
        return next(new Error("Email already registered"));
    }
}

function validateLoginUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(3).max(20).required()
    })

    const result = schema.validate(user);
    return result;
}

async function loginUser(req, res, next) {
    const result = validateLoginUser(req.body);

    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const { email, password } = result.value;
    const user = await User.findOne({ email });

    if (user) {
        const isPasswordMatched = passwordHash.verify(password, user.password);
        if (isPasswordMatched) {
            const payload = {
                _id: user._id,
                isAdmin: user.isAdmin,
                email: user.email,
            };

            const token = jwt.sign(payload, process.env.JWT_KEY);
            return res.json({ Message: "Login successful", Token: token });
        }
    }

    res.status(400);
    const err = new Error("Email or password invalid");
    return next(err);
}


async function updateUser(req, res, next) {
    const loggedInUser = req.session.user;

    const schema = Joi.object({
        phone: Joi.string().min(10).max(10).required(),
        name: Joi.string().min(4).max(10).required()
    })

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }
    else {
        let user = await User.findById(loggedInUser._id);
        user = Object.assign(user, req.body);
        user = await user.save();
        res.json(user);
    }
}

async function updateUserById(req, res, next) {
    const user_id = req.params.user_id;
    console.log("LOggedIn User", req.body);

    let user = await User.findById(user_id);
    user = Object.assign(user, req.body);
    user = await user.save();
    res.json(user);
}



module.exports = { getUsers, saveUser, loginUser, updateUser, updateUserById };