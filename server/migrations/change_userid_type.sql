-- Изменяем тип поля userId в таблице Carts
ALTER TABLE "Carts" 
ALTER COLUMN "userId" TYPE INTEGER 
USING "userId"::INTEGER;

-- Изменяем тип поля userId в таблице Favorites
ALTER TABLE "Favorites" 
ALTER COLUMN "userId" TYPE INTEGER 
USING "userId"::INTEGER;

-- Добавляем внешний ключ для Carts
ALTER TABLE "Carts"
ADD CONSTRAINT "Carts_userId_fkey" 
FOREIGN KEY ("userId") 
REFERENCES "Users"(id) 
ON DELETE CASCADE;

-- Добавляем внешний ключ для Favorites
ALTER TABLE "Favorites"
ADD CONSTRAINT "Favorites_userId_fkey" 
FOREIGN KEY ("userId") 
REFERENCES "Users"(id) 
ON DELETE CASCADE;
