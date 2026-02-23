/*
  Warnings:

  - The primary key for the `click_events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `click_events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `short_links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `short_links` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `shortLinkId` on the `click_events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `short_links` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "click_events" DROP CONSTRAINT "click_events_shortLinkId_fkey";

-- DropForeignKey
ALTER TABLE "short_links" DROP CONSTRAINT "short_links_userId_fkey";

-- AlterTable
ALTER TABLE "click_events" DROP CONSTRAINT "click_events_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "shortLinkId",
ADD COLUMN     "shortLinkId" INTEGER NOT NULL,
ADD CONSTRAINT "click_events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "short_links" DROP CONSTRAINT "short_links_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "short_links_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "click_events_shortLinkId_idx" ON "click_events"("shortLinkId");

-- CreateIndex
CREATE INDEX "short_links_userId_idx" ON "short_links"("userId");

-- AddForeignKey
ALTER TABLE "short_links" ADD CONSTRAINT "short_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "click_events" ADD CONSTRAINT "click_events_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "short_links"("id") ON DELETE CASCADE ON UPDATE CASCADE;
