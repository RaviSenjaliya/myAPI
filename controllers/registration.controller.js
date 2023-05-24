const config = require("../config/auth.config");
const db = require("../models");
const { body } = require("express-validator/check");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator/check");
const validate = db.Validate;
// const Role = db.role;

exports.validate = (method) => {
  switch (method) {
    case "Validatesignup": {
      return [
        body("firstname", "firstname does not exists")
          .exists()
          .isLength({ min: 5, max: 20 }),
        //   -------------------------------------
        body("lastname", "lastname does not exists")
          .exists()
          .isLength({ min: 5, max: 20 }),
        //   -------------------------------------
        body("phone").optional().isInt(),
        //   -------------------------------------
        body("email", "Invalid email").exists().isEmail(),
        //   -------------------------------------
        body("password", "password does not exists").exists(),
        //   -------------------------------------

        body("confirmpassword").custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Passwords do not match");
          }
          return true;
        }),
      ];
    }
  }
};

exports.Validatesignup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const Validate = new validate({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    confirmpassword: req.body.confirmpassword,
  });

  // =======================================================================
  Validate.save(Validate).then((y) => {
    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }).then((roles) => {
        Validate.roles = roles.map((role) => role._id);

        Validate.save(Validate).then((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Validate was registered successfully!" });
        });
      });
    } else {
      Role.findOne({ name: "Validate" }).then((role) => {
        console.log(role);

        Validate.roles = [role._id];

        Validate.save().then((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Validate was registered successfully!" });
        });
      });
    }
  });
};

exports.Validatesignin = (req, res) => {
  Validate.findOne({
    Validatename: req.body.Validatename,
  })
    .populate("roles", "-__v")
    .exec()
    .then((Validate) => {
      if (!Validate) {
        return res.status(404).send({ message: "Validate Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        Validate.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: Validate.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < Validate.roles.length; i++) {
        authorities.push("ROLE_" + Validate.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: Validate._id,
        Validatename: Validate.Validatename,
        email: Validate.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
