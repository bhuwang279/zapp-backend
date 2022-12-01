"use strict";

// System imports
const _ = require("lodash");
const models = require("./model");
const { v1: uuidv1 } = require("uuid");
const { ValidationError } = require("../../helpers/errors");
// Local imports

class FileService {
  static create(file = {}) {
    const errors = [];
    if (_.isEmpty(file.path)) {
      errors.push({ key: "path", message: "The `path` must not be empty." });
    }
    if (_.isEmpty(file.mimetype)) {
      errors.push({
        key: "mimetype",
        message: "The `mimetype` must not be empty.",
      });
    }
    if (errors.length) {
      throw new ValidationError(errors);
    }

    return models.File.create(file);
  }
  static delete(file) {
    const where = FileService._buildUpdateCriteria(file);
    return models.File.update(
      { deletedAt: new Date() },
      {
        where,
      }
    );
  }
  static async update(input) {
    const where = FileService._buildUpdateCriteria(input);
    return models.File.update(input, { returning: true, where })
      .then((self) => File.findByPk(where.id))
      .catch((e) => {
        throw new Error(e);
      });
  }

  static _buildUpdateCriteria(doc) {
    const errors = [];
    const where = {};
    // Either id required.
    if (!doc.id) {
      errors.push({ key: "id", message: "'id' is required" });
    }
    if (errors.length) {
      throw errors;
    }
    where["id"] = doc.id;
    // Delete the id from main input
    delete doc.id;
    return where;
  }

  static uploadFile({ filename, stream, dir }) {
    stream
      .pipe(createWriteStream(resolve(process.cwd(), `src/${dir}/${filename}`)))
      .on("finish", () => Promise.resolve({ filename }))
      .on("error", Promise.reject);
  }

  static validateFile({ filename, stream, dir }) {
    // const extFile = filename.replace(".", "");

    // const extPattern = /(jpg|jpeg|png|gif|svg)/gi.test(extFile);
    // if (!extPattern) throw new TypeError("Image format is not valid");

    const fileExits = existsSync(
      resolve(process.cwd(), `src/${dir}/${filename}`)
    );
    if (!fileExits) return uploadFile({ filename, stream });
    const newFileName = uuidv1();
    return uploadFile({ newFileName, stream, dir });
  }

  static fileUpload({ filename, stream, dir }) {
    return filename
      ? validateFile({ filename, stream, dir })
      : new Error("Image is required");
  }
}

module.exports = FileService;
