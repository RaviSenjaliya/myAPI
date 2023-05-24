// je field ralkhvi  hoy te aya lakhavni

module.exports = (mongoose) => {
  const Validate = mongoose.model(
    "Validate",
    mongoose.Schema(
      {
        // je input field rakhvi hoy te lakhvani ane controller ma layjavani
        firstname: String,
        lastname: String,
        phone: Number,
        email: String,
        password: String,
        confirmpassword: String,
      },
      { timestamps: true }
    )
  );

  return Validate; //name je rakhyu te controller ma lay javanu
};
