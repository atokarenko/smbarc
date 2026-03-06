FROM node:22-alpine

WORKDIR /app

# better-sqlite3 needs build tools for native addon
RUN apk add --no-cache python3 make g++

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Push schema to SQLite (creates DB if missing) + seed
RUN npx prisma db push --skip-generate && npx prisma db seed

EXPOSE 7001

CMD ["npm", "run", "dev"]
