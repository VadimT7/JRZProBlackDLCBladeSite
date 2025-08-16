'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star, User } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Александр П.',
    rating: 5,
    date: '2024-01-15',
    position: 'Профессиональный игрок',
    review: 'Невероятные лезвия! DLC покрытие действительно держит заточку намного дольше. Скольжение стало заметно лучше.',
  },
  {
    id: 2,
    name: 'Dmitry K.',
    rating: 5,
    date: '2024-01-10',
    position: 'Goalie, Amateur League',
    review: 'Best investment for my game. The 30\' radius is perfect for butterfly saves. Edge quality is unmatched.',
  },
  {
    id: 3,
    name: 'Иван С.',
    rating: 5,
    date: '2024-01-05',
    position: 'Защитник',
    review: 'Точность профилирования поражает. Пара идеально сбалансирована. Рекомендую всем серьезным игрокам.',
  },
  {
    id: 4,
    name: 'Maria L.',
    rating: 5,
    date: '2023-12-28',
    position: 'Forward, Women\'s League',
    review: 'The mirror finish is real! Glide improvement is noticeable from the first stride. Worth every ruble.',
  },
  {
    id: 5,
    name: 'Сергей В.',
    rating: 5,
    date: '2023-12-20',
    position: 'Тренер',
    review: 'Рекомендую всем своим ученикам. Качество на высшем уровне, доставка быстрая. Отличный продукт!',
  },
  {
    id: 6,
    name: 'Pavel M.',
    rating: 5,
    date: '2023-12-15',
    position: 'Beer League Hero',
    review: 'Game changer! My edges hold through multiple games now. No more mid-game sharpening.',
  },
];

export function ReviewsList() {
  const t = useTranslations('reviews');

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-8 glass p-8 rounded-2xl">
            <div>
              <p className="text-4xl font-bold text-dlc-gold">5.0</p>
              <p className="text-sm text-dlc-text-secondary">{t('stats.rating')}</p>
            </div>
            <div className="w-px h-12 bg-dlc-silver/20" />
            <div>
              <p className="text-4xl font-bold">127</p>
              <p className="text-sm text-dlc-text-secondary">{t('stats.reviews')}</p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass glass-hover p-6 rounded-lg"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-dlc-silver/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-dlc-silver" />
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-dlc-text-secondary">{review.position}</p>
                  </div>
                </div>
                <p className="text-xs text-dlc-text-secondary">{review.date}</p>
              </div>

              {/* Rating */}
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-dlc-gold text-dlc-gold"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-sm text-dlc-text-secondary leading-relaxed">
                {review.review}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
