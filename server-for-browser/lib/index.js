"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.static('data'));
app.listen(3142, function (error) {
    if (error) {
        console.log(error);
    }
    console.log('listening in port 3142');
});
