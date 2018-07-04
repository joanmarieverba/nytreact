const router = require("express").Router();
const articleRoutes = require("./article");

// routes
router.use("/article", articleRoutes);

module.exports = router;
