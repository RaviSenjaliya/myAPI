const express = require("express");
const cors = require("cors");
const app = express();
// import library and files
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
const expressValidator = require("express-validator");
app.use(expressValidator());

var corsOptions = {
  origin: "http://localhost:3000",
};

const db = require("./models");
const errorHandler = require("./middlewares/errorHandler");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./routes/state.routes")(app);
require("./routes/city.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/registration.routes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Calculator application." });
});

//error handler
app.use(errorHandler);

// let express to use this
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
