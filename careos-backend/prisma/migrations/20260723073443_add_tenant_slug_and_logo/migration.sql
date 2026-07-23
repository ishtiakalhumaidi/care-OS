/*
  Warnings:

  - A unique constraint covering the columns `[childCode]` on the table `Child` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `childCode` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `Child` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ChildGuardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnrollmentStatus" ADD VALUE 'SUSPENDED';
ALTER TYPE "EnrollmentStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "city" TEXT,
ADD COLUMN     "closeTime" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "openTime" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Child" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedById" TEXT,
ADD COLUMN     "childCode" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "suspensionReason" TEXT,
ADD COLUMN     "tenantId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'APPLIED';

-- AlterTable
ALTER TABLE "ChildGuardian" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "childId" TEXT,
ADD COLUMN     "relationship" TEXT;

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "taxId" TEXT,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "ChildCodeSequence" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "yearMonth" TEXT NOT NULL,
    "lastSerial" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ChildCodeSequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChildCodeSequence_tenantId_yearMonth_key" ON "ChildCodeSequence"("tenantId", "yearMonth");

-- CreateIndex
CREATE UNIQUE INDEX "Child_childCode_key" ON "Child"("childCode");

-- CreateIndex
CREATE INDEX "Child_tenantId_status_idx" ON "Child"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "Tenant"("slug");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
