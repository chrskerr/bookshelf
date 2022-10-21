-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersBooks" (
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "readAt" DATETIME,
    "readNext" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("userId", "bookId"),
    CONSTRAINT "UsersBooks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UsersBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UsersBooks" ("bookId", "createdAt", "readAt", "readNext", "updatedAt", "userId") SELECT "bookId", "createdAt", "readAt", "readNext", "updatedAt", "userId" FROM "UsersBooks";
DROP TABLE "UsersBooks";
ALTER TABLE "new_UsersBooks" RENAME TO "UsersBooks";
CREATE INDEX "UsersBooks_userId_idx" ON "UsersBooks"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
