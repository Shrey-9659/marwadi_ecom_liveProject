const { register } = require("../controllers/userControls");

const router = require("express").Router();

router.post("/register", register)

module.exports = router;