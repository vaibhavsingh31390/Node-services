const express = require("express");
const router = express.Router();

const controller = require("../Controller/emailController");
router.post("/send-mail", controller.sendMail);
module.exports = router;
