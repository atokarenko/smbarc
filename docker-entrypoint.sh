#!/bin/sh
set -e

DB_PATH="${DATABASE_URL#file:}"

# Copy seed database to volume on first run
if [ ! -f "$DB_PATH" ]; then
  echo ">>> First run — copying seed database..."
  cp /app/seed.db "$DB_PATH"
  echo ">>> Database ready."
else
  echo ">>> Database exists at $DB_PATH"
fi

# Start Next.js standalone server
echo ">>> Starting server on port ${PORT:-3000}..."
exec node server.js
