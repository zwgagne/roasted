/*
  Warnings:

  - Added the required column `user_inviting_id` to the `meetups` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meetups" DROP CONSTRAINT "meetups_meetup_id_fkey";

-- AlterTable
ALTER TABLE "meetups" ADD COLUMN     "user_inviting_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "meetups" ADD CONSTRAINT "meetups_user_inviting_id_fkey" FOREIGN KEY ("user_inviting_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
