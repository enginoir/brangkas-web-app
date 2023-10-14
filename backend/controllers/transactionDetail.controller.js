const { productController } = require(".");
const db = require("../models");
const { sequelize } = require("../models");
const Controller = require("./baseController");

class TransactionDetailController extends Controller {
  constructor(modelName) {
    super(modelName);
  }

  // createMultiValues = async (req, res) => {
  //   try {
  //     const multiValue = req.body;
  //     const updateThisToDB = [];
  //     const removeThisFromDB = [];
  //     const addThisToDB = [];
  //     await sequelize.transaction(async (t) => {
  //       for (let item of multiValue) {
  //         if (item.id) {
  //           const tempItem = await this.db.findByPK(item.id, {
  //             logging: false,
  //           });
  //           const updateStock = tempItem.dataValues.qty - item.qty;
  //           if (item.qty) {
  //             //yang punya id (di DB) di update
  //             await this.db.update(
  //               { ...item },
  //               { where: { id: item.id }, logging: false, transaction: t }
  //             );
  //           } else if (item.qty === 0) {
  //             //yang punya id tapi qty 0 di delete dari DB
  //             await this.db.destroy({
  //               where: { id: item.id },
  //               logging: false,
  //               transaction: t,
  //             });
  //           }
  //           await productController.updateAfterTransaction({
  //             body: {
  //               id: item.productId,
  //               quantity: updateStock,
  //               transaction: t,
  //             },
  //           });
  //         } else if (!item.id && item.qty) {
  //           //yang ga punya id di kumpulin
  //           addThisToDB.push(item);
  //         }
  //       }
  //       await this.db.bulkCreate(addThisToDB, {
  //         logging: false,
  //         transaction: t,
  //       }); //yang ga punya id di push ke DB
  //     });
  //     await this.db.bulkCreate(multiValue, {
  //       updateOnDuplicate: ["qty"],
  //       logging: false,
  //     });
  //     return res.send("successfully update this transaction");
  //   } catch (err) {
  //     return res.status(500).send(err?.message);
  //   }
  // };

  createMultiValues = async (req, res) => {
    try {
      const multiValue = req.body;
      const updateThisToDB = [];
      const removeThisFromDB = [];
      await sequelize.transaction(async (t) => {
        for (let item of multiValue) {
          if (item.id) {
            const tempItem = await this.db.findByPk(item.id, {
              logging: false,
            });
            const updateStock = tempItem.dataValues.qty - item.qty;
            if (item.qty === 0) {
              //yang punya id tapi qty 0 di delete dari DB
              item.updateStock = updateStock;
              removeThisFromDB.push(item.id);
              updateThisToDB.push(item);
            } else if (item.qty) {
              //yang punya id (di DB) di update
              item.updateStock = updateStock;
              updateThisToDB.push(item);
            }
          } else if (!item.id && item.qty) {
            //yang ga punya id di insert
            item.updateStock = -item.qty;
            updateThisToDB.push(item);
          }
        }
        await productController
          .updateAfterTransaction(
            {
              body: {
                multiValue: updateThisToDB,
                transaction: t,
              },
            },
            res
          )
          .then((result) => {
            if (result !== 1) throw new Error(result);
          });
        await this.db.bulkCreate(multiValue, {
          updateOnDuplicate: ["qty"],
          transaction: t,
          logging: false,
        });
        await this.db.destroy({
          where: { id: removeThisFromDB },
          logging: false,
          transaction: t,
        });
        return res.send("successfully update this transaction");
      });
    } catch (err) {
      return res.status(500).send(err?.message);
    }
  };
}

module.exports = new TransactionDetailController("Transaction_details");
