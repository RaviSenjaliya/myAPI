const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.state = require("./state.model")(mongoose);
db.city = require("./city.model")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");
db.Validate = require("./registration.model");
db.userAddress = require("./userAddress.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
