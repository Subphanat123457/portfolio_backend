/*
  Warnings:

  - You are about to drop the column `image_url` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `project_url` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `code_url` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demo_url` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "image_url",
DROP COLUMN "project_url",
ADD COLUMN     "code_url" TEXT NOT NULL,
ADD COLUMN     "demo_url" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
