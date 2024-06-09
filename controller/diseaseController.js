const prisma = require("../prisma/prisma");

exports.addDisease = async (req, res) => {
    const { id, name, advice } = req.body;
    const { userId } = req.params;

    // Check if the user is an admin
    const user = await prisma.user.findUnique({
        where: {
            userId: userId,
        },
    });
    if (!user) {
        return res.status(404).json({
            status: false,
            message: "User not found",
        });
    }
    if (user.isAdmin == false) {
        return res.status(403).json({
            status: false,
            message: "Only admin can update the disease database",
        });
    }

    // Check for disease duplicate in the database
    const diseaseIdExist = await prisma.disease.count({
        where: {
            diseaseId: id,
        },
    })
    if (diseaseIdExist > 0) {
        return res.status(400).json({
            status: false,
            message: "Disease ID already exists in the database",
        });
    }

    // Check for disease duplicate in the database
    const diseaseNameExist = await prisma.disease.count({
        where: {
            diseaseName: name,
        },
    })
    if (diseaseNameExist > 0) {
        return res.status(400).json({
            status: false,
            message: "Disease ID already exists in the database",
        });
    }

    try {
        const newDisease = await prisma.disease.create({
            data: {
                diseaseId: id,
                diseaseName: name,
                diseaseAdvice: advice
            },
        });
        res.status(201).json({
            status: true,
            message: "Disease Added to the database!",
            data: newDisease,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};