-- Добавляем колонку isAdmin в таблицу Users
ALTER TABLE "Users" 
ADD COLUMN "isAdmin" BOOLEAN DEFAULT FALSE;

-- Делаем первого пользователя админом (опционально)
UPDATE "Users" 
SET "isAdmin" = TRUE 
WHERE id = 1;
