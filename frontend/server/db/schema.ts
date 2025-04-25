import { sql } from "drizzle-orm";
import { pgTableCreator, integer } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `coneixement_${name}`);

export const users = createTable("users", (d) => ({
	id: d
		.varchar({ length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: d.varchar({ length: 255 }),
	email: d.varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
}));