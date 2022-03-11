const e = require("express");
const controller = require("./payController");

const app = module.exports = e();

app.post("/stripe/pay", controller.lookUpAndPay);

export default {};
