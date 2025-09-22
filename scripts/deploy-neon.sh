#!/bin/bash

# Neon Database Deployment Script
echo "🚀 Deploying to Neon Database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    echo "Please set your Neon database URL:"
    echo "export DATABASE_URL='postgresql://username:password@hostname/database?sslmode=require'"
    exit 1
fi

echo "✅ DATABASE_URL is set"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npm run db:generate

# Run migrations
echo "🗄️ Running database migrations..."
npm run db:migrate

# Seed the database
echo "🌱 Seeding database..."
npm run seed

echo "🎉 Neon database deployment completed!"
echo ""
echo "📊 Your database is now ready with:"
echo "• Product schema created"
echo "• Sample data seeded"
echo "• Ready for production use"
echo ""
echo "🔗 Database URL: ${DATABASE_URL}"

