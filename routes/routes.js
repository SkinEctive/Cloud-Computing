//import
const express = require("express");
const auth = require("../middleware/auth");
const authorizeToken = require("../middleware/authorizeToken");
const userController = require("../controller/userController");



// Welcome route
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to SkinEctive API Server."
    })
});

// Auth's routes
router.post('/login', auth.login)
router.post('/register', auth.register)
router.delete('/logout', auth.logout)

// User routes
router.get('/users', authorizeToken, userController.getUsers)

module.exports = router;