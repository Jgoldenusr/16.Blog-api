const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/:userId/posts", userController.getUserPosts);

router.post("/signup", userController.newUser);

router.post("/login", userController.authenticateUser);

module.exports = router;
