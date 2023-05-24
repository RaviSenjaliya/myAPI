//je method lakho te routs ma import karavni

const db = require("../models"); // model store karavyu
const Question = db.state; //model ma je name banavyu te aya lavine upar no db set karavi devano

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const state = new Question({
    name: req.body.name,
  });

  // Save Tutorial in the database
  state
    .save(state)
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
  Question.find()
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

  Question.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`,
        });
      } else {
        res.send({
          message: "Question was deleted successfully!",
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
  Question.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Questions were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Questions.",
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

  Question.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
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
