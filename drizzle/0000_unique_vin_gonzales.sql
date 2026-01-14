CREATE TABLE "references" (
	"int" integer,
	"int1" integer DEFAULT 10,
	"int2" integer NOT NULL,
	"boolean" boolean,
	"text" text,
	"varchar1" varchar,
	"varchar2" varchar(256),
	"char1" char,
	"char2" char(256),
	"numeric1" numeric,
	"numeric2" numeric(100),
	"numeric3" numeric(100, 20),
	"json1" json,
	"json2" json DEFAULT '{"foo":"bar"}'::json,
	"jsonb1" jsonb,
	"jsonb2" jsonb DEFAULT '{"foo":"bar"}'::jsonb,
	"uuid1" uuid,
	"uuid2" uuid DEFAULT gen_random_uuid(),
	"time1" time,
	"date" date,
	"timestamp1" timestamp
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "todos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"task" varchar(256),
	"isdone" boolean DEFAULT false,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
