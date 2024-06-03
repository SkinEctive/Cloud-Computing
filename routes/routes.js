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
router.post('/register', auth.register)
router.post('/login', auth.login)
// router.delete('/logout', auth.logout)

// User routes
router.get('/users', userController.getAllUsers)
router.get('/users/:userId', userController.getUserById)
router.put('/users/:userId/changeDetails', userController.changeUserDetails)
router.put('/users/:userId/changePassword', userController.changeUserPassword)
router.delete('/users/:userId/delete', userController.deleteUser)


module.exports = router;