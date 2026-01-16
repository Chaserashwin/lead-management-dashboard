const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, analyticsController.getAnalytics);
router.get("/revenue", auth, analyticsController.getRevenueAnalytics);

module.exports = router;
