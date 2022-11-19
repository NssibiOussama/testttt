const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema(
  {
    nom: String,
    prenom: String,
    adresse:String
  },
  { timestamps: true }
);
module.exports = mongoose.model("Student", studentSchema);
