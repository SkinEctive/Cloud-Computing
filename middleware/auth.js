require("dotenv").config();
const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];


function generateAccessToken(payload) {
  return jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

exports.register = async (req, res) => {
  const { email, fName, lName, password, confirmPassword } = req.body;
  console.log(email, fName, lName, password, confirmPassword);
  const defaultImgUrl = 'https://storage.googleapis.com/skinective/usersProfileImage/defaultImg';

  if (password !== confirmPassword) {
    return res.status(400).json({
      status: false,
      message: "Passwords do not match",
    });
  }

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

    const newUser = await prisma.user.create({
      data: {
        userEmail: email,
        userFName: fName,
        userLName: lName,
        userPassword: hashedPassword,
        userImgUrl: defaultImgUrl
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


  try {
    if (await bcrypt.compare(password, user.userPassword)) {
      const accessToken = generateAccessToken(user.userId);
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

// exports.logout = async (req, res) => {
//   refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//   res.sendStatus(204);
// };
