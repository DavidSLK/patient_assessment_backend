"use strict";

require("reflect-metadata");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _routes = require("./routes");

require("./database/connect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const app = (0, _express.default)(); //app.use(cors({ origin: 'https://patient-assessment-frontend.vercel.app' }));

app.use((0, _cors.default)());
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_routes.routes);
app.listen(process.env.PORT || 3333, () => console.log('Server running...'));