// je field ralkhvi  hoy te aya lakhavni

module.exports = (mongoose) => {
  const Question = mongoose.model(
    "state",
    mongoose.Schema(
      {
        // je input field rakhvi hoy te lakhvani ane controller ma layjavani

        name: String,
      },
      { timestamps: true }
    )
  );

  return Question; //name je rakhyu te controller ma lay javanu
};
