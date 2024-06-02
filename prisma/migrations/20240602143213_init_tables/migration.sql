/*
  Warnings:

  - Made the column `isAdmin` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `isAdmin` BOOLEAN NOT NULL DEFAULT false;
