const prisma = require("../prisma/prisma");

exports.getAllArticles = async (req, res) => {
    try {
        const article = await prisma.article.findMany();
        res.status(200).json({
            status: true,
            message: "All articles",
            data: article,
        });
    } catch (error) {
        console.error("Error retrieving articles:", error);
        res.status(500).json({
            status: false,
            message: "An unexpected error occurred while retrieving articles.",
        });
    }
};

exports.getArticlesById = async (req, res) => {
    const { articleId } = req.params;
    console.log(articleId);

    try {
        const article = await prisma.article.findUnique({
            where: {
                articleId: articleId
            }
        });

        if (!article) {
            return res.status(404).json({
                status: false,
                message: "Article not found.",
            });
        }

        res.status(200).json({
            status: true,
            message: "Article retrieved successfully",
            data: article,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "An unexpected error occurred while retrieving articles.",
        });
    }
};

exports.createArticle = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req.params;
    console.log(userId, title, content);

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
            message: "User is not an admin",
        });
    }

    const articleExist = await prisma.article.count({
        where: {
            articleTitle: title,
        },
    })
    if (articleExist > 0) {
        return res.status(400).json({
            status: false,
            message: "Article title already exists",
        });
    }

    try {
        const newArticle = await prisma.article.create({
            data: {
                articleAuthor: userId,
                articleTitle: title,
                articleContent: content,
            },
        });
        res.status(201).json({
            status: true,
            message: "Article Created!",
            data: newArticle,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
};

exports.deleteArticle = async (req, res) => {
    const { articleId } = req.body;
    const { userId } = req.params;


    try {
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
                message: "User is not an admin",
            });
        }

        const article = await prisma.article.findUnique({
            where: {
                articleId: articleId
            }
        });

        if (!article) {
            return res.status(404).json({
                status: false,
                message: "Article not found.",
            });
        }

        if (article.articleAuthor != userId) {
            return res.status(400).json({
                status: false,
                message: "Only the author can delete the article",
            });
        }

        const deletedArticle = await prisma.article.delete({
            where: {
                articleId: articleId
            },
        });

        res.status(200).json({
            status: true,
            message: "Article deleted successfully.",
            data: deletedArticle,
        });

    } catch {
        res.status(500).json({
            "status": false,
            "message": "An unexpected error occurred on the server",
        })
    }

};