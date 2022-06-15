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
  "postURL" text NOT NULL,
  "description" varchar(500),
  "userId" integer NOT NULL REFERENCES users(id),
  "linkId" integer NOT NULL REFERENCES links(id),
  "createdAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "links"{
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "image" TEXT NOT NULL,
  "description" VARCHAR(255) NOT NULL,
  "url" TEXT NOT NULL UNIQUE 
}

CREATE TABLE IF NOT EXISTS "likes"(
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES users(id), 
  "postId" INTEGER NOT NULL REFERENCES posts(id)
)

CREATE TABLE IF NOT EXISTS "tags"(
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL
);
