-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Connected', 'Disconnected', 'Error');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "uuidUser" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rg" TEXT,
    "cpf" TEXT,
    "sexo" TEXT,
    "sectorId" INTEGER NOT NULL,
    "superUser" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bracelets" (
    "id" SERIAL NOT NULL,
    "uuidBracelet" TEXT NOT NULL,
    "userBracelet" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bracelets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spots" (
    "id" SERIAL NOT NULL,
    "uuidSpot" TEXT NOT NULL,
    "spotName" TEXT NOT NULL,
    "sectorId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'Disconnected',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectors" (
    "id" SERIAL NOT NULL,
    "uuidSector" TEXT NOT NULL,
    "sectorName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sectors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuidUser_key" ON "users"("uuidUser");

-- CreateIndex
CREATE UNIQUE INDEX "bracelets_uuidBracelet_key" ON "bracelets"("uuidBracelet");

-- CreateIndex
CREATE UNIQUE INDEX "spots_uuidSpot_key" ON "spots"("uuidSpot");

-- CreateIndex
CREATE UNIQUE INDEX "sectors_uuidSector_key" ON "sectors"("uuidSector");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bracelets" ADD CONSTRAINT "bracelets_userBracelet_fkey" FOREIGN KEY ("userBracelet") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spots" ADD CONSTRAINT "spots_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
