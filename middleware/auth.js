require("dotenv").config();
const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const users = [];
exports.users = users;

function generateAccessToken(payload) {
  return jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

exports.register = async (req, res) => {
  const { email, fName, lName, password, confirmPassword } = req.body;
  console.log(email, fName, lName, password, confirmPassword);

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: false,
      message: "Passwords do not match",
    });
  }

  // Check user on prisma
  const exists = await prisma.user.count({
    where: {
      userEmail: email,
    },
  });
  if (exists > 0) {
    return res.status(400).json({
      status: false,
      message: "Email already exists",
    });
  }

  //encrypt password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    //Push to local array
    // const user = { email: email, password: hashedPassword }
    // users.push(user)
    const newUser = await prisma.user.create({
      data: {
        userEmail: email,
        userFName: fName,
        userLName: lName,
        userPassword: hashedPassword,
      },
    });
    const accessToken = generateAccessToken(newUser.userId);
    res.status(201).json({
      status: true,
      message: "User Created!",
      data: newUser,
      accessToken: accessToken,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // User local
  // const validUser = users.find(user => user.email === email)
  // console.log(validUser.password);

  const user = await prisma.user.findUnique({
    where: {
      userEmail: email,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  // Search user local
  // if (validUser == null) {
  //     // Jika pengguna tidak ditemukan, kirimkan respons bahwa login gagal
  //     return res.status(401).json({ message: 'User has not registered' });
  // }

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

  // try {
  //     if (await bcrypt.compare(password, validUser.password)) {
  //         const accessToken = generateAccessToken(user.userId)
  //         res.status(200).json({
  //             "status": true,
  //             "message": 'Login Succesfull',
  //             "accessToken": accessToken,
  //         });
  //     } else {
  //         res.status(401).json({ message: `Password doesn't match` });
  //     }
  // } catch {
  //     res.status(500).send()
  // }

  try {
    if (await bcrypt.compare(password, user.userPassword)) {
      const accessToken = createToken(user.userId);
      res.status(200).json({
        status: true,
        message: "Login Succesfull",
        accessToken: accessToken,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Invalid password",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.logout = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};
