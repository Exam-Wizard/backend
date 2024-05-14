CREATE TABLE IF NOT EXISTS "faculties_roles" (
	"faculty" uuid NOT NULL,
	"role" varchar(255) NOT NULL,
	CONSTRAINT "faculties_roles_faculty_role_pk" PRIMARY KEY("faculty","role")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faculties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"image" varchar(255),
	CONSTRAINT "faculties_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"is_unique" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles_permissions" (
	"role" varchar(255) NOT NULL,
	"permission" varchar(255) NOT NULL,
	CONSTRAINT "roles_permissions_role_permission_pk" PRIMARY KEY("role","permission")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permissions" (
	"name" varchar(255) PRIMARY KEY NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classes" (
	"name" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "faculties" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "faculties" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "faculties_roles" ADD CONSTRAINT "faculties_roles_faculty_faculties_id_fk" FOREIGN KEY ("faculty") REFERENCES "faculties"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "faculties_roles" ADD CONSTRAINT "faculties_roles_role_roles_name_fk" FOREIGN KEY ("role") REFERENCES "roles"("name") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_role_roles_name_fk" FOREIGN KEY ("role") REFERENCES "roles"("name") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles_permissions" ADD CONSTRAINT "roles_permissions_permission_permissions_name_fk" FOREIGN KEY ("permission") REFERENCES "permissions"("name") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
