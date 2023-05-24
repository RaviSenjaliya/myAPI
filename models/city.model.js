// je field ralkhvi  hoy te aya lakhavni

module.exports = (mongoose) => {
  const Question1 = mongoose.model(
    "city",
    mongoose.Schema(
      {
        // je input field rakhvi hoy te lakhvani ane controller ma layjavani

        name: String,
        stateID: String,
      },
      { timestamps: true }
    )
  );

  return Question1; //name je rakhyu te controller ma lay javanu
};
