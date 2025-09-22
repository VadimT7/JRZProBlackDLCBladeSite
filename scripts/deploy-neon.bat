@echo off
REM Neon Database Deployment Script for Windows
echo 🚀 Deploying to Neon Database...

REM Check if DATABASE_URL is set
if "%DATABASE_URL%"=="" (
    echo ❌ Error: DATABASE_URL environment variable is not set
    echo Please set your Neon database URL:
    echo set DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
    exit /b 1
)

echo ✅ DATABASE_URL is set

REM Generate Prisma client
echo 📦 Generating Prisma client...
call npm run db:generate

REM Run migrations
echo 🗄️ Running database migrations...
call npm run db:migrate

REM Seed the database
echo 🌱 Seeding database...
call npm run seed

echo 🎉 Neon database deployment completed!
echo.
echo 📊 Your database is now ready with:
echo • Product schema created
echo • Sample data seeded
echo • Ready for production use
echo.
echo 🔗 Database URL: %DATABASE_URL%

