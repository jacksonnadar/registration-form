const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_cryptr);
const Register = require("../api/model/registerSchema");
const RegisterFaculty = require("../api/model/registerSchemaFaculty");
const varify = require("../middleware/auth");

router.get("/faculty", async (req, res) => {
  try {
    res.status(200).render("index", { faculty: true });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.get("/", async (req, res) => {
  try {
    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.get("/users", varify, async (req, res) => {
  try {
    const users = await Register.find();
    const faculty = await RegisterFaculty.find();
    res.render("users", { users, faculty });
  } catch (err) {
    console.log(err);
  }
});

router.get("/present", async (req, res) => {
  try {
    const users = await Register.find({ arrived: true });
    const faculty = await RegisterFaculty.find({ arrived: true });
    res.render("present", { users, faculty });
  } catch (err) {
    console.log(err);
  }
});

router.get("/thankyou", (req, res) => {
  try {
    res.render("thankyou.ejs");
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.post("/", (req, res) => {
  storeToDb(Register, req, res);
});
router.post("/faculty", async (req, res) => {
  storeToDb(RegisterFaculty, req, res);
});

async function storeToDb(Collection, req, res) {
  try {
    console.log(req.body.email);
    let encryptedemail;
    const username = await Collection.findOne({ name: req.body.name });
    if (username) {
      return res
        .status(200)
        .json({ name: `${req.body.name} is already registered` });
    }
    if (req.body.email) {
      encryptedemail = cryptr.encrypt(req.body.email);
    } else {
      encryptedemail = "";
    }
    const register = new Collection({
      name: req.body.name,
      email: encryptedemail,
      age: req.body.age,
      qualification: req.body.qualification,
      intrest: req.body.intrest,
      gender: req.body.gender,
      arrived: false,
      date: Date.now()
    });

    const result = await register.save();
    console.log(result);

    res.status(303).json({ msg: "sucsess" });
  } catch (err) {
    res.status(500).json({ err: err });
  }
}

router.patch("/arrival/:id", varify, (req, res) => {
  updateArival(Register, req, res);
});

router.patch("/faculty/:id", (req, res) => {
  updateArival(RegisterFaculty, req, res);
});
async function updateArival(Collection, req, res) {
  try {
    const id = req.params.id;
    const result = await Collection.updateOne(
      { _id: id },
      {
        $set: { arrived: req.body.arrived }
      }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: true });
  }
}

router.get("/login", (req, res) => {
  try {
    res.status(200).render("login", { msg: "" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", (req, res) => {
  if (req.body.email !== "sahyog@dataninja.com")
    return res
      .status(200)
      .render("login", { msg: "invalid email our password" });
  if (req.body.password !== "dataninjachamp")
    return res
      .status(200)
      .render("login", { msg: "invalid email our password" });

  req.session.varified = true;
  res.status(200).redirect("/register/users");
});
module.exports = router;
