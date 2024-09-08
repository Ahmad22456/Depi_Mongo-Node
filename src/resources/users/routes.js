const express = require("express");
const router = express.Router();
const { register, login, listAllUsers } = require("./controller");
const { chechAuth } = require("./middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/", listAllUsers);

module.exports = router;
