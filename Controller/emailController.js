const ejs = require("ejs");
const Email = require("../Utils/Mailer");
exports.sendMail = async (req, res, next) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(403).json({
      status: "fail",
      statusCode: 403,
      message: "Please fill all details.",
    });
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
