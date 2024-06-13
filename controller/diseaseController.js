const prisma = require("../prisma/prisma");

exports.getAllDiseases = async (req, res) => {
    try {
        const disease = await prisma.disease.findMany();
        res.status(200).json({
            status: true,
            message: "All diseases",
            data: disease,
        });
    } catch (error) {
        console.error("Error retrieving diseases:", error);
        res.status(500).json({
            status: false,
            message: "An unexpected error occurred while retrieving diseases.",
        });
    }
};

exports.getDiseaseById = async (req, res) => {
    const { diseaseId } = req.params;

    try {
        const disease = await prisma.disease.findUnique({
            where: {
                diseaseId: diseaseId
            }
        });

        if (!disease) {
            return res.status(404).json({
                status: false,
                message: "Disease not found.",
            });
        }

        res.status(200).json({
            status: true,
            message: "Disease retrieved successfully",
            data: disease,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "An unexpected error occurred while retrieving diseases.",
        });
    }
};

exports.addDisease = async (req, res) => {
    const { id, name, description, action } = req.body;
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
                diseaseDescription: description,
                diseaseAction: action,
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