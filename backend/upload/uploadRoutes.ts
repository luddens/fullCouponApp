const e = require("express");
const uploadController = require("./uploadController");
const app = module.exports = e();

app.post("/upload/productImage", uploadController.uploadProductImage);
// app.post("/upload/avatarImage", uploadController.uploadAvatar);

export default {};