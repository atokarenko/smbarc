#!/bin/sh
set -e

# Initialize SQLite database if not exists
DB_PATH="${DATABASE_URL#file:}"
if [ ! -f "$DB_PATH" ]; then
  echo ">>> Initializing database..."
  npx prisma db push --skip-generate
  npx prisma db seed
  echo ">>> Database ready."
else
  echo ">>> Database exists, running migrations..."
  npx prisma db push --skip-generate
fi

# Start Next.js standalone server
echo ">>> Starting server on port ${PORT:-3000}..."
exec node server.js
