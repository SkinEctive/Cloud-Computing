const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to SkinEctive API Server."
    })
});

// Auth's routes
// router.post('/register', auth.register)
router.post('/login', auth.login)
router.post('/register', auth.register)
router.delete('/logout', auth.logout)
router.get('/users', auth.getUsers)

module.exports = router;