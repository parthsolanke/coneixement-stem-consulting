import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `coneixement_${name}`);

// Users table — using Clerk's user ID as the primary key
export const users = createTable("users", (d) => ({
  id: d.varchar({ length: 255 }).notNull().primaryKey(), // Clerk's user ID
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  createdAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}));

// Quizzes table — foreign key to users.id (Clerk ID)
export const quizzes = createTable("quizzes", (d) => ({
  id: d.varchar({ length: 255 }).notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: d.varchar({ length: 255 }).notNull().references(() => users.id),
  quizType: d.varchar({ length: 50 }).notNull(),
  responses: d.jsonb(),
  completedAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}));

// Reports table — foreign keys to users.id and quizzes.id
export const reports = createTable("reports", (d) => ({
  id: d.varchar({ length: 255 }).notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: d.varchar({ length: 255 }).notNull().references(() => users.id),
  quizId: d.varchar({ length: 255 }).notNull().references(() => quizzes.id),
  reportData: d.jsonb().notNull(),
  generatedAt: d.timestamp({ withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}));
