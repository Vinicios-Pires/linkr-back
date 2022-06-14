CREATE TABLE IF NOT EXISTS "users"(
  "id" SERIAL PRIMARY KEY,
  "username" varchar (255) NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
  "pictureUrl" text NOT NULL,
  "createdAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "posts"(
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES users(id),
  "link" TEXT NOT NULL UNIQUE,
  "description" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW ()
);

CREATE TABLE IF NOT EXISTS "likes"(
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER REFERENCES users(id), 
  "postId" INTEGER REFERENCES posts(id), 
)

CREATE TABLE IF NOT EXISTS "tags"(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "sessions" (
  "id" SERIAL PRIMARY KEY,
  "token" TEXT NOT NULL UNIQUE,
  "userId" INTEGER NOT NULL REFERENCES users(id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW ()
);
