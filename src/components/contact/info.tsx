'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';

export function ContactInfo() {
  const t = useTranslations('contact.info');

  const contactMethods = [
    {
      icon: MessageCircle,
      label: t('phone'),
      value: '+7 925 480-54-93',
      href: 'tel:+79254805493',
      color: 'text-green-400',
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
        
        <div className="space-y-6">
          <div className="mb-6">
            <p className="text-sm text-dlc-text-secondary mb-2">{t('distributor')}</p>
            <p className="text-lg font-semibold text-dlc-gold">{t('company')}</p>
          </div>
          
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
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
        <h4 className="text-lg font-semibold mb-4">{t('businessHours.title')}</h4>
        <div className="space-y-2 text-dlc-text-secondary">
          <div className="flex justify-between">
            <span>{t('businessHours.weekdays')}</span>
            <span>{t('businessHours.weekdaysTime')}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('businessHours.saturday')}</span>
            <span>{t('businessHours.saturdayTime')}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('businessHours.sunday')}</span>
            <span>{t('businessHours.closed')}</span>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="glass p-6 rounded-lg bg-gradient-to-br from-dlc-silver/5 to-transparent">
        <p className="text-sm text-center">
          <span className="text-dlc-silver font-semibold">{t('responseTime.label')}</span> {t('responseTime.time')}
        </p>
      </div>
    </motion.div>
  );
}
