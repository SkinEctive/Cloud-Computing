const prisma = require("../prisma/prisma")
const bcrypt = require("bcrypt")



exports.getAllUsers = async (req, res) => {
    try {
        const user = await prisma.user.findMany();
        res.status(200).json({
            status: true,
            message: "All users",
            data: user,
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({
            status: false,
            message: "An unexpected error occurred while retrieving users.",
        });
    }
};

exports.getUserById = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);

    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            status: true,
            message: "User profile retrieved successfully",
            data: user,
        })
    } catch {
        res.status(500).json({
            status: false,
            message: "An unexpected error occurred on the server",
        })
    }
};

exports.changeUserDetails = async (req, res) => {
    const { fName, lName, email } = req.body;
    const { userId } = req.params;
    // console.log(fName, lName, email);
    console.log("sampe method change");
    const updatedData = {};



    try {
        const user = await prisma.user.findUnique({
            where: { userId: userId }
        });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found.',
            });
        }
        if (fName !== undefined) updatedData.userFName = fName;
        if (lName !== undefined) updatedData.userLName = lName;
        if (email !== undefined) {
            const userEmailExist = await prisma.user.findUnique({
                where: {
                    userEmail: email,
                },
            });

            if (userEmailExist) {
                return res.status(400).json({
                    status: false,
                    message: "Email already exists",
                });
            }

            updatedData.userEmail = email;
        }


        if (!req.file) {

            console.log("userImageUrl = " + user.userImgUrl);
            // Update user data
            const updatedUser = await prisma.user.update({
                where: { userId: userId },
                data: updatedData,
            });

            return res.status(200).json({
                status: true,
                message: "User updated successfully.",
                data: updatedUser,
            });


        } else if (req.file && req.file.cloudStoragePublicUrl) {
            imageUrl = req.file.cloudStoragePublicUrl
            updatedData.userImgUrl = imageUrl;
            console.log("imageUrl = " + imageUrl);
            console.log("userImageUrl = " + user.userImgUrl);



            // Update user data
            const updatedUser = await prisma.user.update({
                where: { userId: userId },
                data: updatedData,
            });

            return res.status(200).json({
                status: true,
                message: "User updated successfully.",
                data: updatedUser,
            });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "An unexpected error occurred on the server.",
        });
    }
};


exports.changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const { userId } = req.params;



    try {
        const user = await prisma.user.findUnique({
            where: { userId: userId }
        });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'User not found.',
            });
        }

        //Validate old password
        const validPassword = await bcrypt.compare(oldPassword, user.userPassword);
        if (!validPassword) {
            return res.status(400).json({
                status: false,
                message: 'Invalid password.',
            });
        }

        //Validate new password
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                status: false,
                message: "Passwords do not match",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedPasswordUser = await prisma.user.update({
            where: { userId: userId },
            data: {
                userPassword: hashedPassword,
            },
        });

        res.status(200).json({
            status: true,
            message: 'Password updated successfully.',
            data: updatedPasswordUser,
        });

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            }
        });

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found.",
            });
        }

        const deletedUser = await prisma.user.delete({
            where: {
                userId: userId
            },
        });

        res.status(200).json({
            status: true,
            message: "User deleted successfully.",
            data: deletedUser,
        });

    } catch {
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
        })
    }
};