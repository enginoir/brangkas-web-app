const moment = require("moment");
const { Transaction, Sequelize, sequelize } = require("../models");

const reportController = {
  getAllReports: async (req, res) => {
    try {
      const result = await Transaction.findAll();
      res.status(200).json({
        status: "Success",
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getReportByDate: async (req, res) => {
    try {
      let datefrom;
      let dateto;
      if (req.query.datefrom && req.query.dateto) {
        datefrom = new Date(req.query.datefrom);
        dateto = new Date(req.query.dateto + " 23:59:59");
      }
      if (req.query.datefrom && !req.query.dateto) {
        datefrom = new Date(req.query.datefrom);
        dateto = new Date(req.query.datefrom + " 23:59:59");
        dateto = new Date(dateto.setDate(dateto.getDate() + 7));
      }
      if (!req.query.datefrom && req.query.dateto) {
        dateto = new Date(req.query.dateto + " 23:59:59");
        datefrom = new Date(req.query.dateto);
        datefrom = new Date(datefrom.setDate(datefrom.getDate() - 7));
      }
      if (!req.query.datefrom && !req.query.dateto) {
        dateto = new Date();
        datefrom = new Date();
        datefrom = new Date(new Date().setDate(datefrom.getDate() - 7));
      }

      const result = await Transaction.findAll({
        logging: false,
        attributes: [
          [sequelize.fn("SUM", sequelize.col("total")), "totalByCategory"],
          [sequelize.fn("DATE", sequelize.col("createdAt")), "Date"],
          "order_type",
        ],
        group: [
          [sequelize.fn("DATE", sequelize.col("createdAt")), "Date"],
          "order_type",
        ],
        where: {
          createdAt: {
            [Sequelize.Op.between]: [datefrom, dateto],
          },
        },
        order: ["Date"],
      });

      const data = new Map();
      result.forEach((val) => {
        console.log(val.dataValues);
        if (!data.has(val.dataValues.Date))
          data.set(val.dataValues.Date, { total: 0 });
        data.set(val.dataValues.Date, {
          ...data.get(val.dataValues.Date),
          [val.dataValues.order_type]: Number(val.dataValues.totalByCategory),
          [`total`]:
            data.get(val.dataValues.Date).total +
            Number(val.dataValues.totalByCategory),
        });
      });

      return res.send(Object.fromEntries(data));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = reportController;
