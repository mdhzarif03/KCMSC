/*
  Warnings:

  - Made the column `previousInstitution` on table `AdmissionApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "AdmissionGuardian_applicationId_idx";

-- AlterTable
ALTER TABLE "AdmissionApplication" ALTER COLUMN "previousInstitution" SET NOT NULL,
ALTER COLUMN "nationality" DROP DEFAULT,
ALTER COLUMN "medium" DROP DEFAULT,
ALTER COLUMN "birthRegistrationNo" DROP DEFAULT,
ALTER COLUMN "fatherName" DROP DEFAULT,
ALTER COLUMN "fatherNidNumber" DROP DEFAULT,
ALTER COLUMN "fatherContactNumber" DROP DEFAULT,
ALTER COLUMN "fatherOccupation" DROP DEFAULT,
ALTER COLUMN "fatherNationality" DROP DEFAULT,
ALTER COLUMN "fatherIsAlive" DROP DEFAULT,
ALTER COLUMN "motherName" DROP DEFAULT,
ALTER COLUMN "motherNidNumber" DROP DEFAULT,
ALTER COLUMN "motherContactNumber" DROP DEFAULT,
ALTER COLUMN "motherOccupation" DROP DEFAULT,
ALTER COLUMN "motherNationality" DROP DEFAULT,
ALTER COLUMN "motherIsAlive" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AdmissionCycle" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AdmissionGuardian" ALTER COLUMN "isAlive" DROP DEFAULT;
