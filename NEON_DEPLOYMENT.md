# Neon Database Deployment Guide

This guide will help you deploy your JRZ Pro Black DLC project to use a Neon PostgreSQL database.

## Prerequisites

1. A Neon account (sign up at [neon.tech](https://neon.tech))
2. Node.js and npm installed
3. Your project dependencies installed (`npm install`)

## Step 1: Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Sign in or create an account
3. Click "Create Project"
4. Choose a project name (e.g., "jrz-pro-black-dlc")
5. Select a region closest to your users
6. Click "Create Project"

## Step 2: Get Your Database Connection String

1. In your Neon project dashboard, go to the "Connection Details" section
2. Copy the connection string (it will look like this):
   ```
   postgresql://username:password@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

## Step 3: Set Up Environment Variables

### For Local Development:
1. Copy `env.neon.example` to `.env.local`
2. Replace the `DATABASE_URL` with your actual Neon connection string:
   ```bash
   DATABASE_URL="postgresql://your-actual-connection-string"
   ```

### For Production (Vercel/Netlify/etc.):
Add the `DATABASE_URL` environment variable in your hosting platform's dashboard.

## Step 4: Deploy to Neon

### Option A: Using npm script (Recommended)
```bash
npm run deploy:neon
```

### Option B: Using the deployment script
```bash
# For Windows
scripts\deploy-neon.bat

# For Linux/Mac
chmod +x scripts/deploy-neon.sh
./scripts/deploy-neon.sh
```

### Option C: Manual deployment
```bash
# 1. Generate Prisma client
npm run db:generate

# 2. Deploy migrations
npm run db:deploy

# 3. Seed the database
npm run seed
```

## Step 5: Verify Deployment

1. Check your Neon dashboard to see the created tables
2. Run your application: `npm run dev`
3. Visit your application and verify the shop page loads with products

## Database Schema

Your Neon database will contain the following tables:
- `Product` - Main product information
- `Variant` - Product variants (Player/Goalie with different sizes)
- `Order` - Customer orders
- `OrderItem` - Individual items in orders
- `Payment` - Payment information from YooKassa

## Troubleshooting

### Connection Issues
- Verify your connection string is correct
- Check that your IP is whitelisted (Neon allows all IPs by default)
- Ensure SSL mode is set to `require`

### Migration Issues
- If migrations fail, check the Neon console for error logs
- You may need to reset the database and run migrations again

### Seed Data Issues
- Verify the seed script runs without errors
- Check that all required environment variables are set

## Production Considerations

1. **Environment Variables**: Set up production environment variables in your hosting platform
2. **Connection Pooling**: Neon handles connection pooling automatically
3. **Backups**: Neon provides automatic backups
4. **Monitoring**: Use Neon's built-in monitoring tools
5. **Scaling**: Neon automatically scales with your usage

## Support

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Cost Optimization

Neon offers a generous free tier:
- 3GB storage
- 10GB transfer per month
- Connection pooling
- Automatic backups

For production use, consider upgrading to a paid plan for better performance and support.

