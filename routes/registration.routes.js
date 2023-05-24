module.exports = (app) => {
  const auth = require("../controllers/registration.controller"); //akhu controler state ma import karavyu
  var router = require("express").Router(); //router ma express import karavyu

  //controlar mathi method je banavi te aya call karvani
  router.post(
    "/Validatesignup",
    auth.validate("Validatesignup"),
    auth.Validatesignup
  );

  router.post("/Validatesignin", auth.Validatesignin);

  app.use("/api", router); // je URL nu name rakhvu hoy te
};
