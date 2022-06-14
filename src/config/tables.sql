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
  "createdAt" timestamp NOT NULL DEFAULT now()
);