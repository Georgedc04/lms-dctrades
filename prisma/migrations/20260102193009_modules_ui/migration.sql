/*
  Warnings:

  - A unique constraint covering the columns `[moduleId,order]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId,order]` on the table `Module` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "order" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "order" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Lesson_moduleId_idx" ON "Lesson"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_moduleId_order_key" ON "Lesson"("moduleId", "order");

-- CreateIndex
CREATE INDEX "LessonProgress_userId_idx" ON "LessonProgress"("userId");

-- CreateIndex
CREATE INDEX "Module_courseId_idx" ON "Module"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Module_courseId_order_key" ON "Module"("courseId", "order");
