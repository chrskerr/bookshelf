/*
  Warnings:

  - You are about to drop the column `purchasedAt` on the `Book` table. All the data in the column will be lost.
  - Added the required column `isOwned` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isbn` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "firstPublishedAt" DATETIME NOT NULL,
    "isOwned" BOOLEAN NOT NULL,
    "seriesId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Book_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("createdAt", "firstPublishedAt", "id", "seriesId", "title", "updatedAt") SELECT "createdAt", "firstPublishedAt", "id", "seriesId", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
