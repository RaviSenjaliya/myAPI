const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = db.user;
const UserAddress = db.userAddress;
const Role = db.role;

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save(user).then((y) => {
    // ======================================================= email karvamate
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      port: "535",
      auth: {
        user: "ravisenjaliya99@gmail.com",
        pass: "xyohzwwyhepfqbzl",
      },
    });
    var mailOptions = {
      from: "mailto:ravisenjaliya99@gmail.com",
      to: req.body.email,
      subject: "welcome to sheetal ",
      text: "I am past student of sheetal now I am employee of sheetal",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // =======================================================================

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }).then((roles) => {
        user.roles = roles.map((role) => role._id);

        user.save(user).then((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    } else {
      Role.findOne({ name: "user" }).then((role) => {
        console.log(role);

        user.roles = [role._id];

        user.save().then((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
// ==========================================================================
exports.createwithTransaction = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  try {
    const session = await db.mongoose.connection.startSession();
    await session.withTransaction(async () => {
      const userAddress = new UserAddress({
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        userId: user.id,
      });

      await user.save(user, session);
      await userAddress.save(userAddress, session);
    });

    await session.endSession();
    await res.send(user);

    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

// ==========================================================================
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
