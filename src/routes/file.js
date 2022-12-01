"use strict";

const uploadFile = require("../models/file/middleware/upload");

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      filename: req.file.filename,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const download = (req, res) => {
  const fileName = req.params.name;
  let APP_ROOT = process.env.PWD;
  if (process.env.platform === "win32" || process.env.platform === "win64") {
    APP_ROOT = process.cwd();
  }
  const directoryPath = `${APP_ROOT}/src/uploads/`;

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
module.exports = (app) => {
  app.post("/upload", upload);
  app.get("/download/:name", download);
};
