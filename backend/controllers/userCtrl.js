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
import bcryptjs from 'bcryptjs';
export const test = (req, res) => {
    res.json({
        message: "First Api"
    });
};
export const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = yield User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            },
        }, { new: true });
        const _a = updatedUser._doc, { password } = _a, rest = __rest(_a, ["password"]);
        res.status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
});
export const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    }
    catch (error) {
        next(error);
    }
});
//admin
export const adminUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find().lean();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
export const adminEdit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        next(error);
    }
});
