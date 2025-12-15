# Email Setup Guide

This site uses **Gmail SMTP** to send automated email notifications (completely free).

## Setup Instructions

### 1. Enable 2-Step Verification (if not already enabled)
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if it's not already enabled
3. This is required to generate App Passwords

### 2. Generate Gmail App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select:
   - **App**: Mail
   - **Device**: Other (Custom name) → Enter "JRZ Site"
3. Click "Generate"
4. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 3. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Email Settings (Gmail SMTP)
SMTP_USER=your_email@gmail.com          # Your Gmail address
SMTP_PASSWORD=abcdefghijklmnop           # The 16-character App Password (no spaces)
ADMIN_EMAIL=oaegoshina@gmail.com          # Admin email for order notifications
```

**Important Notes:**
- Use the **16-character App Password**, NOT your regular Gmail password
- Remove spaces from the password when pasting
- The `SMTP_USER` should be the same Gmail account you're using
- `ADMIN_EMAIL` is where order notifications will be sent (already set to oaegoshina@gmail.com)

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

