const express = require("express");
const chatController = require("../controllers/chatController");


const router = express.Router();

router.post("/addmsg",chatController.addMessage)
router.post("/getmsg",chatController.getAllMessage)

module.exports = router