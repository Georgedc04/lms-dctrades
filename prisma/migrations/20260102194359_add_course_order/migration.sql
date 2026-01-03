-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Course_order_idx" ON "Course"("order");
