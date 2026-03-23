#!/bin/sh
set -e

PRISMA="./node_modules/.bin/prisma"

# Initialize SQLite database if not exists
DB_PATH="${DATABASE_URL#file:}"
if [ ! -f "$DB_PATH" ]; then
  echo ">>> Initializing database..."
  $PRISMA db push --skip-generate
  $PRISMA db seed
  echo ">>> Database ready."
else
  echo ">>> Database exists, running migrations..."
  $PRISMA db push --skip-generate
fi

# Start Next.js standalone server
echo ">>> Starting server on port ${PORT:-3000}..."
exec node server.js
