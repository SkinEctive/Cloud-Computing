//import
const express = require("express");
const auth = require("../middleware/auth");
const authorizeToken = require("../middleware/authorizeToken");
const userController = require("../controller/userController");
const articleController = require("../controller/articleController");
const diseaseController = require("../controller/diseaseController");
const storage = require("../modules/storage");
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 10 * 1024 * 1024,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})



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
router.put('/users/:userId/changeDetails', multer.single('IMAGE'), storage.uploadToCloudStorage, userController.changeUserDetails)
router.put('/users/:userId/changePassword', userController.changeUserPassword)
router.delete('/users/:userId/delete', userController.deleteUser)

// Article routes
router.get('/articles', articleController.getAllArticles)
router.get('/articles/:articleId', articleController.getArticlesById)
router.post('/articles/:userId/create', articleController.createArticle)
router.delete('/articles/:userId/delete', articleController.deleteArticle)

// Disease routes
router.post('/disease/:userId/add', diseaseController.addDisease)

// Detect History Routes



module.exports = router;