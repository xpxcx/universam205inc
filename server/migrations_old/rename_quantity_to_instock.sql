-- Если колонка quantity существует, переименовываем ее в inStock
ALTER TABLE public."Products" 
RENAME COLUMN quantity TO "inStock";

-- Если колонки quantity нет, добавляем inStock
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'Products' AND column_name = 'inStock') THEN
        ALTER TABLE public."Products" 
        ADD COLUMN "inStock" integer NOT NULL DEFAULT 0;
    END IF;
END $$;
