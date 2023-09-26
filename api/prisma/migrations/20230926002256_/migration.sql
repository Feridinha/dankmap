/*
  Warnings:

  - Made the column `path` on table `Route` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Route" ALTER COLUMN "path" SET NOT NULL,
ALTER COLUMN "path" SET DEFAULT '[]';
