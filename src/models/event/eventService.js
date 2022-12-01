const models = require("./model");

class EventService {
  static async create(name, slug, entityId, entityIdValue, meta) {
    const event = await models.Event.create({
      name,
      slug,
      [entityId]: entityIdValue,
      meta: {
        ...meta,
      },
    });

    return event;
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

  static async update(input) {
    const where = EventService._buildUpdateCriteria(input);
    return models.Event.update(input, { returning: true, where })
      .then((self) => models.Event.findByPk(where.id))
      .catch((e) => {
        throw new Error(e);
      });
  }

  static async getDocumentEvents(documentId) {
    const events = await models.Event.findAll({
      raw: true,
      where: {
        documentId,
      },
      order: [["createdAt", "ASC"]],
    });
    return events;
  }
}

module.exports = EventService;
