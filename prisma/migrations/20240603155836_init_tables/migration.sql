/*
  Warnings:

  - Added the required column `articleContent` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `articleContent` TEXT NOT NULL;
