const express = require("express");
const leadController = require("../controllers/leadController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, leadController.getLeads);
router.get("/stats", auth, leadController.getLeadStats);
router.get("/:id", auth, leadController.getLeadById);
router.post("/", auth, leadController.createLead);
router.put("/:id", auth, leadController.updateLead);
router.delete("/:id", auth, leadController.deleteLead);

module.exports = router;
