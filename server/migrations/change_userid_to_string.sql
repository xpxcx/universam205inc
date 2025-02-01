-- Изменяем тип поля userId в таблице Carts на VARCHAR
ALTER TABLE "Carts" 
ALTER COLUMN "userId" TYPE VARCHAR;

-- Изменяем тип поля userId в таблице Favorites на VARCHAR
ALTER TABLE "Favorites" 
ALTER COLUMN "userId" TYPE VARCHAR;
