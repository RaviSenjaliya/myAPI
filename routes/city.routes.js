module.exports = (app) => {
  const city = require("../controllers/city.controller"); //akhu controler state ma import karavyu

  var router = require("express").Router(); //router ma express import karavyu

  //controlar mathi method je banavi te aya call karvani
  router.post("", city.create);
  router.get("", city.findAll);
  router.delete("/:id", city.delete);
  router.delete("/", city.deleteAll);
  router.put("/:id", city.update);

  app.use("/api/city", router); // je URL nu name rakhvu hoy te
};
