require('dotenv').config()
// const prisma = require("../prisma/prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

let refreshTokens = []
const users = []

function generateAccessToken(email) {
    return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '15d' })
}

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

exports.register = async (req, res) => {
    const { email, fname, lname, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        return res.status(400).json({
            "status": false,
            "message": "Passwords do not match",
        })
    }

    // Check user on prisma
    // const exists = await prisma.user.count({
    //     where: {
    //         EMAIL: email
    //     }
    // });
    // if (exists > 0) {
    //     return res.status(400).json({
    //         "status": false,
    //         "message": "Email already exists",
    //     })
    // }

    //encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        //Push to local array
        const user = { email: email, password: hashedPassword }
        users.push(user)
        res.status(200).json({
            "data": users,
        })

        //Register with Prisma
        // const newUser = await prisma.user.create({
        //     data: {
        //         EMAIL: email,
        //         PASSWORD: hashedPassword,
        //         USERNAME: username
        //     },
        // },
        // )
        // const accessToken = generateAccessToken(newUser.USERID)
        // res.status(200).json({
        //     "status": true,
        //     "message": "Account created successfully",
        //     "data": newUser,
        //     "accesToken": accessToken
        // })

    } catch {
        res.status(500).send()
    }



}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const validUser = users.find(user => user.email === email)
    console.log(validUser.password);

    if (validUser == null) {
        // Jika pengguna tidak ditemukan, kirimkan respons bahwa login gagal
        return res.status(401).json({ message: 'User has not registered' });
    }

    // On prisma
    // const user = await prisma.user.findUnique({
    //     where: {
    //         EMAIL: email
    //     }
    // })
    // if (!user) {
    //     return res.status(400).json({
    //         "status": false,
    //         "message": "Invalid email",
    //     })
    // }


    try {
        if (await bcrypt.compare(password, validUser.password)) {
            const accessToken = generateAccessToken(email)
            res.status(201).json({
                message: 'Login Succesfull',
                data: accessToken,
            });
        } else {
            res.status(403).json({ message: `Password doesn't match` });
        }
    } catch {
        res.status(500).send()
    }

    // On Prisma
    // const validPassword = await bcrypt.compare(password, user.PASSWORD)
    // if (validPassword) {
    //     const token = createToken(user.USERID)
    //     res.status(200).json({
    //         "status": true,
    //         "message": "Login successful",
    //         "data": user.USERNAME,
    //         "token": token
    //     })
    // }
    // else {
    //     res.status(400).json({
    //         "status": false,
    //         "message": "Invalid password",
    //     })
    // }


    // const accessToken = generateAccessToken(email)
    // const refreshToken = jwt.sign(username, process.env.REFRESH_SECRET_KEY)
    // refreshTokens.push(refreshToken)
    // res.json({ users })
    // res.json({
    //     "data": users
    // })
}

exports.logout = async (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
}