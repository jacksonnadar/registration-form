const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_cryptr);
const Register = require("../api/model/registerSchema");

router.get("/", async (req, res) => {
  try {
    const registerdata = await Register.find();
    res.send(registerdata);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await Register.find();
    res.render("users", { users });
  } catch (err) {
    console.log(err);
  }
});

router.get("/thankyou", async (req, res) => {
  try {
    res.render("thankyou.ejs");
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body.email);
    let encryptedemail;
    const username = await Register.findOne({ name: req.body.name });
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
    const register = new Register({
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
});

router.patch("/arrival/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Register.updateOne(
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
});

module.exports = router;
