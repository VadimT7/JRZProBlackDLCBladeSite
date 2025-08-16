'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle, Send as TelegramIcon, Mail } from 'lucide-react';

export function ContactInfo() {
  const t = useTranslations('contact.info');

  const contactMethods = [
    {
      icon: TelegramIcon,
      label: t('telegram'),
      value: '@JRZProSupport',
      href: 'https://t.me/JRZProSupport',
      color: 'text-blue-400',
    },
    {
      icon: MessageCircle,
      label: t('whatsapp'),
      value: '+7 (999) 123-45-67',
      href: 'https://wa.me/79991234567',
      color: 'text-green-400',
    },
    {
      icon: Mail,
      label: t('email'),
      value: 'support@jrzpro.ru',
      href: 'mailto:support@jrzpro.ru',
      color: 'text-dlc-silver',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="glass p-8 rounded-lg">
        <h3 className="text-2xl font-cormorant font-bold mb-6">
          {t('title')}
        </h3>
        
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-dlc-silver/5 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-full bg-dlc-elevation flex items-center justify-center ${method.color}`}>
                <method.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-dlc-text-secondary">{method.label}</p>
                <p className="font-medium group-hover:text-dlc-silver transition-colors">
                  {method.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Business Hours */}
      <div className="glass p-8 rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
        <div className="space-y-2 text-dlc-text-secondary">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>9:00 - 18:00 MSK</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>10:00 - 16:00 MSK</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="glass p-6 rounded-lg bg-gradient-to-br from-dlc-silver/5 to-transparent">
        <p className="text-sm text-center">
          <span className="text-dlc-silver font-semibold">Average response time:</span> 2-4 hours during business hours
        </p>
      </div>
    </motion.div>
  );
}
