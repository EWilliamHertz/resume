/*
  Warnings:

  - You are about to drop the column `excerpt` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the `Bookstore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "BlogPost_createdAt_idx";

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "excerpt",
ADD COLUMN     "project" TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Music" DROP COLUMN "cover",
DROP COLUMN "duration",
ADD COLUMN     "coverUrl" TEXT,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "artist" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Bookstore";

-- CreateIndex
CREATE INDEX "BlogPost_project_idx" ON "BlogPost"("project");
