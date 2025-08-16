'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tErrors = useTranslations('errors');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="glass p-8 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{tErrors('email')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('phone')}
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('message')}
              </label>
              <textarea
                {...register('message')}
                rows={5}
                className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none resize-none"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {t('send')}
              </>
            )}
          </Button>

          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-center"
            >
              Message sent successfully!
            </motion.div>
          )}
        </div>
      </form>
    </motion.div>
  );
}
