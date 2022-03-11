const UserData = require("../dataAccess/users");
const curEnv = require("../../localconfig").curEnv;
const multer = require("multer");
// var upload = multer({ dest: '../uploads/' });
const fs = require("fs");
const path = require("path");

const dev = (curEnv === "development");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./userUploads/",
  filename: function(req, file, cb){
    cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single("myImage");

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
      return cb(null,true);
  } else {
      cb("Error: Images Only!");
  }
}

const uploadController = () =>{
  const uploadProductImage = async (req, res) =>{ 
    // UserData.getUserByUsername(loginUser.username, (getUserError, resUser)=>{
      //get usernam
      upload(req, res, (err) => {
        console.log(req.file);
        if(err){
            console.log("err");
            console.log(err);
        } else {
            if(req.file === undefined){
                res.send({
                    msg: "Error: No File Selected!"
                });
            } else {
                res.send({
                    msg: "File Uploaded!",
                    file: `uploads/${req.file.filename}`
                });
            }
        }
      });
    // }
  };

  const uploadAvatar = async (req, res) =>{
    console.log("uploadAvatar body");
    console.log(req.body);
    // UserData.getUserByUsername(loginUser.username, (getUserError, resUser)=>{
      
    // }
  };

  return {
    uploadProductImage,
    uploadAvatar
  };
};




export = uploadController();
