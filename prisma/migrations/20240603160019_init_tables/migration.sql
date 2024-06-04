/*
  Warnings:

  - Added the required column `historyImgUrl` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `historyImgUrl` VARCHAR(255) NOT NULL;
