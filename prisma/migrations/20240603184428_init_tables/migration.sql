/*
  Warnings:

  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_diseaseId_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_userId_fkey`;

-- DropTable
DROP TABLE `history`;

-- CreateTable
CREATE TABLE `PredictHistory` (
    `predictHistoryId` CHAR(16) NOT NULL,
    `userId` CHAR(16) NOT NULL,
    `diseaseId` CHAR(16) NOT NULL,
    `historyImgUrl` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`predictHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PredictHistory` ADD CONSTRAINT `PredictHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `PredictHistory` ADD CONSTRAINT `PredictHistory_diseaseId_fkey` FOREIGN KEY (`diseaseId`) REFERENCES `Disease`(`diseaseId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
