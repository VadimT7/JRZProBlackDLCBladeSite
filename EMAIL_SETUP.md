# Email Setup Guide

This site supports multiple SMTP providers for sending automated email notifications.

## Option 1: Reg.ru Business Email (Recommended)

If you have a business email registered with reg.ru, use these settings:

### Configure Environment Variables

Add these to your `.env.local` file (or Vercel environment variables):

```env
# Reg.ru SMTP Settings
SMTP_HOST=mail.hosting.reg.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@yourdomain.com     # Your full reg.ru email address
SMTP_PASSWORD=your_email_password        # Your email password
ADMIN_EMAIL=oaegoshina@gmail.com         # Admin email for order notifications
```

**Important Notes:**
- Use your **full email address** as `SMTP_USER` (e.g., `info@yourdomain.com`)
- Use your **regular email password** (not an app password)
- `ADMIN_EMAIL` is where order notifications will be sent (already set to oaegoshina@gmail.com)

### Reg.ru SMTP Details:
- **SMTP Server**: `mail.hosting.reg.ru`
- **Port**: `465`
- **Encryption**: SSL/TLS
- **Authentication**: Required (use full email and password)

## Option 2: Gmail SMTP (Free Alternative)

### 1. Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled

### 2. Generate Gmail App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select:
   - **App**: Mail
   - **Device**: Other (Custom name) → Enter "JRZ Site"
3. Click "Generate"
4. Copy the 16-character password

### 3. Configure Environment Variables

```env
# Gmail SMTP Settings (don't set SMTP_HOST for Gmail)
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
ADMIN_EMAIL=oaegoshina@gmail.com
```

**Important Notes:**
- **Don't set** `SMTP_HOST` when using Gmail (it will auto-detect)
- Use the **16-character App Password**, NOT your regular Gmail password
- Remove spaces from the password when pasting

### 4. Test Email Functionality

When an order is placed:
- ✅ Admin (oaegoshina@gmail.com) receives notification with full order details
- ✅ Customer receives confirmation email

Emails are sent automatically and won't block the order if they fail (errors are logged but don't stop the order process).

## Troubleshooting

**Emails not sending?**
- Check that 2-Step Verification is enabled
- Verify the App Password is correct (16 characters, no spaces)
- Check server logs for email errors
- Make sure `SMTP_USER` matches the Gmail account used to generate the App Password

**Gmail blocking?**
- If Gmail blocks the sign-in attempt, allow "Less secure app access" is NOT needed with App Passwords
- App Passwords are the secure way to use SMTP with Gmail

