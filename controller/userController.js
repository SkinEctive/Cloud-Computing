// const prisma = require("../prisma/prisma")
const { users } = require('../middleware/auth');




exports.getUsers = async (req, res) => {
    res.status(200).json({
        "status": true,
        "message": "All users",
        "data": users,
    })

    // get user with prisma
    // const users = await prisma.user.findMany()
    // res.status(200).json({
    //     "status": true,
    //     "message": "All users",
    //     "data": users,
    // })
}