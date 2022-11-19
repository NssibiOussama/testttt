var express = require("express");
const studentModel = require("../models/Student");
var router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const students = await studentModel.find();
    res.render("form", { title: "Students list", cont: students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async function (req, res, next) {
  const { nom, prenom,adresse } = req.body;
  const student = new studentModel({
    nom,
    prenom,
    adresse
  });
  try {
    await student.save();
    res.redirect("/students");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/delete/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const checkIfExist = await studentModel.findById(id);
    if (!checkIfExist) {
      throw new Error("Student not found");
    }
    await studentModel.findByIdAndDelete(id);
    res.redirect("/students");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const student = await studentModel.findById(id);
    if (!student) {
      throw new Error("student not found");
    }
    res.render("edit", { title: "Edit student", cont: student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/edit/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const { nom, prenom,adresse } = req.body;
    const student = await studentModel.findByIdAndUpdate(id, {
        nom,
        prenom,
        adresse
    });
    if (!student) {
      throw new Error("Error while updating student");
    }
    res.redirect("/students");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
