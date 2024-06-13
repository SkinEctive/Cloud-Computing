-- CreateTable
CREATE TABLE `User` (
    `userId` CHAR(16) NOT NULL,
    `userEmail` VARCHAR(200) NOT NULL,
    `userFName` VARCHAR(200) NOT NULL,
    `userLName` VARCHAR(200) NOT NULL,
    `userPassword` VARCHAR(255) NOT NULL,
    `userImgUrl` VARCHAR(255) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_userEmail_key`(`userEmail`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disease` (
    `diseaseId` CHAR(8) NOT NULL,
    `diseaseName` VARCHAR(200) NOT NULL,
    `diseaseDescription` TEXT NOT NULL,
    `diseaseAction` TEXT NOT NULL,

    PRIMARY KEY (`diseaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `articleId` CHAR(16) NOT NULL,
    `articleAuthor` CHAR(16) NOT NULL,
    `articleTitle` VARCHAR(200) NOT NULL,
    `articleContent` TEXT NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`articleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetectHistory` (
    `detectHistoryId` CHAR(16) NOT NULL,
    `userId` CHAR(16) NOT NULL,
    `diseaseId` CHAR(8) NOT NULL,
    `historyImgUrl` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`detectHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_articleAuthor_fkey` FOREIGN KEY (`articleAuthor`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `DetectHistory` ADD CONSTRAINT `DetectHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `DetectHistory` ADD CONSTRAINT `DetectHistory_diseaseId_fkey` FOREIGN KEY (`diseaseId`) REFERENCES `Disease`(`diseaseId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
