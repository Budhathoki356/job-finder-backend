#!/bin/sh

# Run Prisma commands first
echo "▶️ Generating Prisma client..."
npx prisma generate

echo "🧱 Running Prisma migrations..."
npx prisma migrate dev --name init

# Start the dev server
echo "🚀 Starting the dev server..."
npm run dev