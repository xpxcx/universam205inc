ALTER TABLE public."Products"
ADD COLUMN IF NOT EXISTS quantity integer NOT NULL DEFAULT 1;
