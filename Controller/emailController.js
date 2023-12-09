const ejs = require("ejs");
const Email = require("../utilities/Mailer");
exports.sendMail = async (req, res, next) => {
  const { name, email, type } = req.body;

  if (!name || !email || !type) {
    return res.status(403).json({
      status: "fail",
      statusCode: 403,
      message: "Please fill all details.",
    });
  }
  if (!req.body.phone) {
    req.body.phone = "";
  }
  if (!req.body.message) {
    req.body.message = "";
  }
  const data = await new Email(req.body).sendMessage(req.body);
  if (data) {
    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Mail Sent!",
    });
  }
};
