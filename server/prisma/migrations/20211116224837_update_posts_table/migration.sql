/*
  Warnings:

  - You are about to drop the column `post_title` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "post_title",
ALTER COLUMN "post_content" SET DATA TYPE TEXT;
