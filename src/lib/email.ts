import nodemailer from 'nodemailer';

// Create reusable transporter using SMTP settings
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP credentials not configured. Email sending disabled.');
    return null;
  }

  // If custom SMTP host is provided, use custom settings (e.g., reg.ru)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465' || process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  }

  // Default to Gmail if no custom host is specified
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

interface OrderItem {
  productName: string;
  variantType: string;
  variantSize: string;
  quantity: number;
  price: number;
}

interface OrderEmailData {
  orderId: string;
  customerName?: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  totalAmount: number;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

// Send email to admin about new order
export async function sendAdminOrderNotification(orderData: OrderEmailData): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) return false;

  const adminEmail = process.env.ADMIN_EMAIL || 'oaegoshina@gmail.com';

  const itemsList = orderData.items
    .map(
      (item) =>
        `- ${item.productName} (${item.variantType}, размер: ${item.variantSize}) × ${item.quantity}`
    )
    .join('\n');

  const shippingAddress = orderData.address
    ? `
Адрес доставки:
${orderData.address}
${orderData.city ? `${orderData.city}, ` : ''}${orderData.region || ''}
${orderData.postalCode || ''}
${orderData.country || 'Россия'}`
    : '';

  const mailOptions = {
    from: `JRZ Pro Black DLC <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `Новый заказ #${orderData.orderId.slice(-8).toUpperCase()} - JRZ Pro Black DLC`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d4af37;">Новый заказ получен</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Информация о заказе</h3>
          <p><strong>Номер заказа:</strong> #${orderData.orderId.slice(-8).toUpperCase()}</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
          <p><strong>Статус:</strong> Требуется обработка вручную</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Информация о клиенте</h3>
          ${orderData.customerName ? `<p><strong>Имя:</strong> ${orderData.customerName}</p>` : ''}
          <p><strong>Email:</strong> <a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></p>
          ${orderData.customerPhone ? `<p><strong>Телефон:</strong> <a href="tel:${orderData.customerPhone}">${orderData.customerPhone}</a></p>` : ''}
          ${shippingAddress}
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Товары в заказе</h3>
          <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${itemsList}</pre>
        </div>

        <div style="background-color: #d4af37; color: #000; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0;">Общая сумма: ${orderData.totalAmount.toLocaleString('ru-RU')} ₽</h3>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Это автоматическое уведомление о новом заказе с сайта JRZ Pro Black DLC.</p>
          <p>Пожалуйста, свяжитесь с клиентом в течение 24 часов для подтверждения заказа и организации оплаты.</p>
        </div>
      </div>
    `,
    text: `
Новый заказ получен

Номер заказа: #${orderData.orderId.slice(-8).toUpperCase()}
Дата: ${new Date().toLocaleString('ru-RU')}
Статус: Требуется обработка вручную

Информация о клиенте:
${orderData.customerName ? `Имя: ${orderData.customerName}` : ''}
Email: ${orderData.customerEmail}
${orderData.customerPhone ? `Телефон: ${orderData.customerPhone}` : ''}
${shippingAddress}

Товары в заказе:
${itemsList}

Общая сумма: ${orderData.totalAmount.toLocaleString('ru-RU')} ₽

---
Это автоматическое уведомление о новом заказе с сайта JRZ Pro Black DLC.
Пожалуйста, свяжитесь с клиентом в течение 24 часов для подтверждения заказа и организации оплаты.
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Admin notification email sent for order ${orderData.orderId}`);
    return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    return false;
  }
}

// Send confirmation email to customer
export async function sendCustomerOrderConfirmation(orderData: OrderEmailData): Promise<boolean> {
  const transporter = createTransporter();
  if (!transporter) return false;

  const itemsList = orderData.items
    .map(
      (item) =>
        `- ${item.productName} (${item.variantType}, размер: ${item.variantSize}) × ${item.quantity}`
    )
    .join('\n');

  const mailOptions = {
    from: `JRZ Pro Black DLC <${process.env.SMTP_USER}>`,
    to: orderData.customerEmail,
    subject: `Заказ #${orderData.orderId.slice(-8).toUpperCase()} принят - JRZ Pro Black DLC`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d4af37;">Спасибо за ваш заказ!</h2>
        
        <p>Уважаемый${orderData.customerName ? ` ${orderData.customerName}` : ''} клиент,</p>
        
        <p>Ваш заказ <strong>#${orderData.orderId.slice(-8).toUpperCase()}</strong> успешно принят.</p>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Детали заказа</h3>
          <p><strong>Номер заказа:</strong> #${orderData.orderId.slice(-8).toUpperCase()}</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Товары в заказе</h3>
          <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${itemsList}</pre>
        </div>

        <div style="background-color: #d4af37; color: #000; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0;">Сумма заказа: ${orderData.totalAmount.toLocaleString('ru-RU')} ₽</h3>
          <p style="margin: 10px 0 0 0; font-size: 14px;">Цена и условия доставки будут согласованы при обсуждении заказа</p>
        </div>

        <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
          <h3 style="margin-top: 0; color: #2196F3;">Что дальше?</h3>
          <p>Наша команда свяжется с вами в течение 24 часов для:</p>
          <ul>
            <li>Подтверждения деталей заказа</li>
            <li>Организации оплаты</li>
            <li>Согласования условий доставки</li>
          </ul>
          <p><strong>Поставка:</strong> от 2х рабочих дней</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p><strong>Официальный дистрибьютор JRZ Globalsports в России, Казахстане и ряде стран</strong></p>
          <p>ООО «Грэйтспорт»</p>
          <p>Телефон: <a href="tel:+79254805493">+7 925 480-54-93</a></p>
        </div>
      </div>
    `,
    text: `
Спасибо за ваш заказ!

Уважаемый${orderData.customerName ? ` ${orderData.customerName}` : ''} клиент,

Ваш заказ #${orderData.orderId.slice(-8).toUpperCase()} успешно принят.

Детали заказа:
Номер заказа: #${orderData.orderId.slice(-8).toUpperCase()}
Дата: ${new Date().toLocaleString('ru-RU')}

Товары в заказе:
${itemsList}

Сумма заказа: ${orderData.totalAmount.toLocaleString('ru-RU')} ₽
Цена и условия доставки будут согласованы при обсуждении заказа

Что дальше?
Наша команда свяжется с вами в течение 24 часов для:
- Подтверждения деталей заказа
- Организации оплаты
- Согласования условий доставки

Поставка: от 2х рабочих дней

---
Официальный дистрибьютор JRZ Globalsports в России, Казахстане и ряде стран
ООО «Грэйтспорт»
Телефон: +7 925 480-54-93
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Customer confirmation email sent for order ${orderData.orderId}`);
    return true;
  } catch (error) {
    console.error('Failed to send customer confirmation email:', error);
    return false;
  }
}

