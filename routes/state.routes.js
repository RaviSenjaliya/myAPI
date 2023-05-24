module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const authJwt = require("../middlewares/authJwt");
  const state = require("../controllers/state.controller"); //akhu controler state ma import karavyu
  var router = require("express").Router(); //router ma express import karavyu

  //controlar mathi method je banavi te aya call karvani
  router.post("", state.create);
  router.get("", state.findAll);
  router.delete("/:id", state.delete);
  router.delete("/", state.deleteAll);
  router.put("/:id", state.update);

  app.use("/api/state", router); // je URL nu name rakhvu hoy te
};
