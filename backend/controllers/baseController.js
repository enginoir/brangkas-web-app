const db = require("../models");

class Controller {
  constructor(modelname) {
    this.db = db[modelname];
  }

  async create(req, res) {
    await this.db
      .create({
        ...req.body,
        logging: false,
      })
      .then((result) => {
        delete result.dataValues.password;
        return res.send(result.dataValues);
      })
      .catch((err) => res.status(500).send(err?.message));
  }
  async update(req, res) {
    const { id } = req.params;
    await this.db
      .update({ ...req.body }, { where: { id }, logging: false })
      .then((result) => {
        global.io?.emit(`NEW_TRANSACTION`, "edit");
        return res.send(result);
      })
      .catch((err) => res.status(500).send(err?.message));
  }
  async getByID(req, res) {
    const id = req.params;
    await this.db
      .findByPk(id)
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  }
  async delete(req, res) {
    const id = req.params;
    await this.db
      .destroy({ where: id })
      .then((result) => {
        global.io?.emit(`NEW_TRANSACTION`, "delete");
        return res.send("success");
      })
      .catch((err) => res.status(500).send(err?.message));
  }
}

module.exports = Controller;
