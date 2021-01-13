# Migration `20210112215320-init`

This migration has been generated by lukinovec at 1/12/2021, 10:53:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210112215320-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,25 @@
+datasource db {
+    provider = "sqlite"
+    url = "***"
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
+
+model Task {
+    id          Int      @id @default(autoincrement())
+    name        String
+    createdAt   DateTime @default(now())
+    createdBy   User     @relation(fields: [createdById], references: [id])
+    createdById Int
+    completed   Boolean  @default(false)
+}
+
+model User {
+    id       Int    @id @default(autoincrement())
+    name     String
+    email    String @unique
+    password String
+    tasks    Task[]
+}
```

