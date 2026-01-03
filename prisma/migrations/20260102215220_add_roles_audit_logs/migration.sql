/*
  Warnings:

  - You are about to drop the column `metadata` on the `AuditLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "metadata";

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_targetId_idx" ON "AuditLog"("targetId");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
