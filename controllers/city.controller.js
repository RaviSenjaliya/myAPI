//je method lakho te routs ma import karavni

const db = require("../models"); // model store karavyu
const Question1 = db.city; //model ma je name banavyu te aya lavine upar no db set karavi devano

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const city = new Question1({
    name: req.body.name,
    stateID: req.body.stateID,
  });

  // Save Tutorial in the database
  city
    .save(city)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
// ===============================================================

exports.findAll = (req, res) => {
  // let error = "1234";
  // let error2 = error.fixedd();
  Question1.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
// ===============================================================

exports.delete = (req, res) => {
  const id = req.params.id;

  Question1.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Question1 with id=${id}. Maybe Question1 was not found!`,
        });
      } else {
        res.send({
          message: "Question1 was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
// ===============================================================

exports.deleteAll = (req, res) => {
  Question1.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Question1s were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Question1s.",
      });
    });
};
// ===============================================================

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Question1.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
