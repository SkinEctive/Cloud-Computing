-- CreateTable
CREATE TABLE `User` (
    `userId` CHAR(8) NOT NULL,
    `userEmail` VARCHAR(200) NOT NULL,
    `userFName` VARCHAR(200) NOT NULL,
    `userLName` VARCHAR(200) NOT NULL,
    `userPassword` VARCHAR(255) NOT NULL,
    `userImgUrl` VARCHAR(255) NULL,
    `isAdmin` BOOLEAN NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `User_userEmail_key`(`userEmail`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disease` (
    `diseaseId` CHAR(8) NOT NULL,
    `diseaseName` VARCHAR(200) NOT NULL,
    `diseaseAdvice` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`diseaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `articleId` CHAR(8) NOT NULL,
    `articleAuthor` CHAR(8) NOT NULL,
    `articleTitle` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `userId` CHAR(16) NOT NULL,
    `diseaseId` CHAR(16) NOT NULL,

    PRIMARY KEY (`userId`, `diseaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_articleAuthor_fkey` FOREIGN KEY (`articleAuthor`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_diseaseId_fkey` FOREIGN KEY (`diseaseId`) REFERENCES `Disease`(`diseaseId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
