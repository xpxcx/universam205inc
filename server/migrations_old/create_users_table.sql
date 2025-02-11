-- Create Users table
CREATE TABLE IF NOT EXISTS public."Users" (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    room VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create index on login for faster lookups
CREATE INDEX IF NOT EXISTS users_login_idx ON public."Users" (login);
