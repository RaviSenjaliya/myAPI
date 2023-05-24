module.exports = (app) => {
  const auth = require("../controllers/auth.controller"); //akhu controler state ma import karavyu
  var router = require("express").Router(); //router ma express import karavyu

  //controlar mathi method je banavi te aya call karvani
  router.post("/signup", auth.signup);
  router.post("/savetransaction", auth.createwithTransaction);
  router.post("/signin", auth.signin);

  app.use("/api", router); // je URL nu name rakhvu hoy te
};
