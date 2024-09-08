const express = require("express");
const router = express.Router();
const { checkAuth } = require("../users/middleware");
const {
  createAd,
  updateAd,
  deleteAd,
  getAllAds,
  getUserAds,
} = require("./controller");

router.get("/", getAllAds);
router.get("/user", checkAuth, getUserAds);
router.post("/", checkAuth, createAd);
router.put("/:id", checkAuth, updateAd);
router.delete("/:id", checkAuth, deleteAd);

module.exports = router;
