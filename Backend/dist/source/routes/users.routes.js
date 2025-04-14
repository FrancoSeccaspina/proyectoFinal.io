"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("../controllers/usersController"));
const registerValidator = require('../validations/register');
const route = express_1.default.Router();
route.get('/users/form', (req, res) => {
    res.render('register');
});
route.get('/users/show/:id', (req, res) => { usersController_1.default.show(req, res); });
route.post('/users/save', registerValidator, (req, res) => { usersController_1.default.save(req, res); });
// route.post('/register/save', (req, res) => { usersController.register(req, res) });
// route.get('/register', (req, res) => { usersController.register(req, res) });
exports.default = route;
