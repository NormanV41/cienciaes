'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var express_1 = __importDefault(require('express'));
var cors_1 = __importDefault(require('cors'));
var morgan_1 = __importDefault(require('morgan'));
var app_root_path_1 = __importDefault(require('app-root-path'));
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
console.log(app_root_path_1.default.toString());
app.use(express_1.default.static(app_root_path_1.default + '/data'));
app.listen(3142, function (error) {
  if (error) {
    console.log(error);
  }
  console.log('listening in port 3142');
});
