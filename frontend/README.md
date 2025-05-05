## Data Relationships

```plaintext
users (Clerk user ID as PK)
 ├── id (Clerk user ID)
 ├── email
 ├── name
 └── createdAt

quizzes
 ├── id (UUID)
 ├── userId (FK → users.id)
 ├── quizType
 ├── responses
 └── completedAt

reports
 ├── id (UUID)
 ├── userId (FK → users.id)
 ├── quizId (FK → quizzes.id)
 ├── reportData
 └── generatedAt
```

## Database Commands

The project uses Drizzle ORM for database management. Here are the available commands:

```bash
# Generate SQL migrations based on your schema changes
npm run db:generate

# Apply pending migrations to your database
npm run db:migrate

# Push schema changes directly to the database (use in development)
npm run db:push

# Launch Drizzle Studio - a GUI to view and edit your database
npm run db:studio
```

### Command Details

- `db:generate`: Creates SQL migration files based on schema changes in your Drizzle configuration
- `db:migrate`: Executes pending migrations in order to update your database schema
- `db:push`: Directly pushes schema changes to the database (useful during development, not recommended for production)
- `db:studio`: Opens Drizzle Studio in your browser, providing a visual interface to:
  - Browse table data
  - Modify records
  - View relationships
  - Execute custom queries
