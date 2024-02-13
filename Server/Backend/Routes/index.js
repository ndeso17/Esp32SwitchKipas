const express = require("express");
const Controller = require("../Controllers/index");
const router = express.Router();

//Get Module
// router.get("/hashing", Controller.convertPlainTextToBcrypt);
router.get("/", Controller.index);
router.post("/getListKipas", Controller.getListKipas);
router.post("/getValueKipas", Controller.getValueKipas);
router.post("/updateValueRpm", Controller.updateValueRPM);
router.post("/updateValueGeleng", Controller.updateValueGeleng);
router.post("/loginUser", Controller.loginUser);
router.put("/logoutUser", Controller.logoutUser);

module.exports = router;
