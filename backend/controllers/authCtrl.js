var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    yield newUser.save();
    res.status(201).json({ message: "User created successfully!" });
});
export const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validUser = yield User.findOne({ email });
        if (!validUser)
            return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword)
            return next(errorHandler(401, 'wrong credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const _a = validUser.toObject(), { password: hashedPassword } = _a, rest = __rest(_a, ["password"]);
        const expiryDate = new Date(Date.now() + 3600000);
        res.cookie('access_token', token, { httpOnly: true,
            expires: expiryDate
        })
            .status(200).json(rest);
    }
    catch (err) {
        next(err);
    }
});
export const google = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const _a = user.toObject(), { password: hashedPassword } = _a, rest = __rest(_a, ["password"]);
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('acess_token', token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest);
        }
        else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8); //last 8 number will be slice
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo
            });
            yield newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const _b = newUser.toObject(), { password: hashedPassword2 } = _b, rest = __rest(_b, ["password"]);
            // const{ password: hashedPassword, ...rest} = user._doc
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('acess_token', token, {
                httpOnly: true,
                expires: expiryDate
            }).status(200).json(rest);
        }
    }
    catch (err) {
    }
});
export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
};
//admin login
export const adminLogin = (req, res) => {
    const usernameA = 'adminau';
    const passwordA = 'admin123';
    try {
        console.log(req.body);
        if (req.body.username === usernameA && req.body.password === passwordA) {
            res.redirect('http://localhost:5173/admin');
        }
        else {
            console.log('Wrong credentials');
            res.status(401).send('Invalid credentials');
        }
    }
    catch (err) {
        console.error(err);
    }
};
