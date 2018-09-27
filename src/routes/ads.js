const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController")

router.get("/ads", adController.index);

module.exports = router;