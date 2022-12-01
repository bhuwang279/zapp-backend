const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let APP_ROOT = process.env.PWD;

if (process.env.platform === "win32" || process.env.platform === "win64") {
  APP_ROOT = process.cwd();
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${APP_ROOT}/src/uploads/`);
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
