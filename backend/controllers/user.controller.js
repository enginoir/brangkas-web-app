const Controller = require("./baseController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class UserController extends Controller {
  constructor(modelName) {
    super(modelName);
  }

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await this.db.findOne({
        where: { username },
        logging: false,
      });
      if (!user) throw new Error("Wrong username or password");
      const isValid = await bcrypt.compare(password, user.dataValues.password);
      if (user.dataValues.role === 2 && !user.dataValues.isActive)
        throw new Error("Your account is disabled");
      if (!isValid) throw new Error("Wrong username or password");
      delete user.dataValues.password;
      const token = jwt.sign(
        {
          id: user.dataValues.id,
          role: user.dataValues.role,
          isActive: user.dataValues.isActive,
        },
        process.env.jwt_secret,
        { expiresIn: "1h" }
      );
      return res.send({ token: token, user: user.dataValues });
    } catch (err) {
      return res.status(406).send(err.message);
    }
  }

  async keepLogin(req, res) {
    try {
      const { token } = req;
      const data = jwt.verify(token, process.env.jwt_secret);
      const user = await this.db.findByPk(data.id, { logging: false });
      delete user.dataValues.password;
      if (!user.dataValues.isActive && user.dataValues.role === 2)
        throw new Error("Your account is disabled");
      const newToken = jwt.sign(
        {
          id: user.dataValues.id,
          role: user.dataValues.role,
          isActive: user.dataValues.isActive,
        },
        process.env.jwt_secret,
        { expiresIn: "1h" }
      );
      return res.send({ token: newToken, user: user.dataValues });
    } catch (err) {
      return res.status(500).send(err?.message);
    }
  }

  async getByQuery(req, res) {
    try {
      const { username, fullname, email, phone, role, gender, page } =
        req.query;
      const limit = 10;
      const { count, rows } = await this.db.findAndCountAll({
        logging: false,
        limit: limit,
        offset: page ? (Number(page) - 1) * limit : 0,
        where: {
          ...(username && {
            [Op.or]: [
              { username: { [Op.like]: `%${username}%` } },
              { fullname: { [Op.like]: `%${username}%` } },
            ],
          }),
          ...(typeof role === "string" && { role }),
        },
      });
      return res.send({ page: Math.ceil(count / limit), rows });
    } catch (err) {
      return res.status(500).send(err?.message);
    }
  }
}

module.exports = new UserController("User");
