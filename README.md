# JRZ Pro Black DLC - Premium Hockey Blades E-commerce Site

A production-ready, luxury e-commerce website for JRZ Pro Black DLC hockey blades, built with Next.js 15, TypeScript, and YooKassa payment integration.

## 🚀 Quick Start

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Database
DATABASE_URL="file:./dev.db"

# Base URL for callbacks
BASE_URL=http://localhost:3000

# YooKassa (Get from https://yookassa.ru)
YKS_SHOP_ID=your_shop_id_here
YKS_SECRET_KEY=your_secret_key_here
YKS_WEBHOOK_TOKEN=generate_long_random_string_here
YKS_SEND_RECEIPT=false

# Email Settings
# Option 1: Reg.ru Business Email (Recommended)
SMTP_HOST=mail.hosting.reg.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@yourdomain.com
SMTP_PASSWORD=your_email_password
ADMIN_EMAIL=oaegoshina@gmail.com

# Option 2: Gmail SMTP (Alternative)
# Don't set SMTP_HOST for Gmail - it will auto-detect
# Get Gmail App Password: https://myaccount.google.com/apppasswords
# SMTP_USER=your_email@gmail.com
# SMTP_PASSWORD=your_gmail_app_password

# Analytics (optional)
YANDEX_METRICA_ID=
PLAUSIBLE_DOMAIN=
```

3. **Set up database:**
```bash
npm run db:generate
npm run db:migrate
npm run seed
```

4. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

## 📋 Features

- **Bilingual Support**: Russian (default) and English with automatic locale detection
- **YooKassa Integration**: Full payment flow with redirect confirmation
- **3D Hero**: WebGL blade visualization with fallback
- **Responsive Design**: Mobile-first, optimized for all devices
- **Cart Management**: Persistent cart with Zustand state management
- **SEO Optimized**: Meta tags, sitemap, robots.txt, structured data
- **Performance**: Next.js Image optimization, lazy loading, code splitting

## 🏗 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: Prisma with SQLite (easily switchable to PostgreSQL)
- **Payments**: YooKassa API
- **State**: Zustand
- **Forms**: React Hook Form + Zod
- **Animation**: Framer Motion
- **3D**: React Three Fiber + Drei
- **i18n**: next-intl

## 💳 YooKassa Setup

### 1. Get YooKassa Credentials

1. Sign up at [YooKassa](https://yookassa.ru)
2. Create a shop in your merchant cabinet
3. Get your Shop ID and Secret Key
4. Enable test mode for development

### 2. Configure Payment Methods

In YooKassa merchant cabinet, enable:
- Bank cards
- SberPay
- Mir Pay
- FPS (Faster Payment System / СБП)

### 3. Set up Webhooks

1. In YooKassa settings, add webhook URL:
   ```
   https://yourdomain.com/api/webhooks/yookassa/YOUR_WEBHOOK_TOKEN
   ```
2. Enable events:
   - payment.succeeded
   - payment.canceled
   - payment.waiting_for_capture

### 4. 54-FZ Receipts

Two options:
- **Recommended**: Enable "Receipts from YooMoney" service in merchant cabinet
- **Alternative**: Set `YKS_SEND_RECEIPT=true` and receipts will be sent with payment

## 🧪 Testing Payments

1. Enable test mode in YooKassa
2. Use test card numbers:
   - Success: `5555 5555 5555 4444`
   - 3DS: `5555 5555 5555 4477`
   - Decline: `5555 5555 5555 4446`

3. Test payment flow:
   - Add items to cart
   - Proceed to checkout
   - Enter email
   - Get redirected to YooKassa
   - Complete payment
   - Return to success page

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/[locale]/    # Marketing pages
│   ├── (shop)/[locale]/         # Shop pages
│   ├── api/                     # API routes
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
├── lib/                         # Utilities and configs
├── messages/                    # i18n translations
└── styles/                      # Global styles

prisma/
├── schema.prisma                # Database schema
└── seed.ts                      # Seed script

public/
└── images/                      # Static images
```

## 🛠 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
npm run seed         # Seed database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

1. Build the app:
   ```bash
   npm run build
   ```

2. Set environment variables

3. Start the server:
   ```bash
   npm run start
   ```

### Production Database

For production, switch to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Update `DATABASE_URL` in production

3. Run migrations:
   ```bash
   npm run db:migrate
   ```

## 📱 Progressive Web App

The site is PWA-ready. To enable:

1. Add manifest.json to public/
2. Add service worker
3. Update meta tags

## 🔒 Security

- All payment data handled by YooKassa
- HTTPS required in production
- Environment variables for sensitive data
- Webhook token validation
- Idempotency keys for payment creation

## 📊 Analytics

Pre-configured for:
- Yandex.Metrica
- Plausible Analytics

Just add your IDs to environment variables.

## 🐛 Troubleshooting

### Payment Issues
- Check YooKassa credentials
- Verify webhook token matches
- Check callback URLs use HTTPS in production
- Review YooKassa logs in merchant cabinet

### Build Issues
- Clear `.next` folder
- Delete `node_modules` and reinstall
- Check Node.js version (18+ required)

## 📄 License

Private commercial project. All rights reserved.

## 🤝 Support

- Telegram: @JRZProSupport
- Email: support@jrzpro.ru
- WhatsApp: +7 (999) 123-45-67

---

Built with ❤️ for Russian hockey players
