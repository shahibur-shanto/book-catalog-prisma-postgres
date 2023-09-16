/*
  Warnings:

  - You are about to drop the column `gebre` on the `book` table. All the data in the column will be lost.
  - Added the required column `genre` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "gebre",
ADD COLUMN     "genre" TEXT NOT NULL;
