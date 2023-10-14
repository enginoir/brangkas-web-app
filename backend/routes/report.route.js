const router = require('express').Router();
const { reportController } = require('../controllers');

// get all transaksi
router.get('/', reportController.getAllReports);

// get by day
router.get('/p1', reportController.getReportByDate);

module.exports = router;
