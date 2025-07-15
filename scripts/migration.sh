#!/bin/sh

echo "▶️ Generating Prisma client..."
npx prisma generate

# Ask if migration should run
echo "Do you want to run a new migration? (yes/no)"
read answer

if [ "$answer" = "yes" ]; then
    # Ask for the migration name
    echo "Enter migration name:"
    read migration_name

    if [ -z "$migration_name" ]; then
        echo "❌ Migration name cannot be empty."
        exit 1
    fi

    # Optional: replace spaces with underscores
    migration_name=$(echo "$migration_name" | tr ' ' '_')

    echo "▶️ Creating new Prisma migration: $migration_name"
    npx prisma migrate dev --name "$migration_name"
else
    echo "⏩ Skipping migration"
fi