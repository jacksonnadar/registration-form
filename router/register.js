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

router.get("/thankyou", async (req, res) => {
  try {
    res.send("<h2>Thank you</h2>");
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const username = await Register.findOne({ name: req.body.name });
    if (username) {
      return res
        .status(200)
        .json({ name: `${req.body.name} is already registered` });
    }
    if (req.body.email) {
      const encryptedemail = cryptr.encrypt(req.body.email);
    } else {
      encryptedemail = "";
    }
    // if (!req.body.qualification) {
    //   const qualification = "";
    // }
    // if (!req.body.intrest) {
    //   const intrest = "";
    // }
    // const decryptedString = cryptr.decrypt(encryptedString);
    const register = new Register({
      name: req.body.name,
      email: encryptedemail,
      age: req.body.age,
      qualification: req.body.qualification,
      intrest: req.body.intrest,
      gender: req.body.gender,
      date: Date.now()
    });

    const result = await register.save();
    console.log(result);

    res.status(303).json({ msg: "sucsess" });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

module.exports = router;
