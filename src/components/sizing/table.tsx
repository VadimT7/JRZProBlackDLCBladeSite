'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

const sizingData = [
  { size: '221', length: 221, shoeSize: '36-37', available: true },
  { size: '230', length: 230, shoeSize: '37-38', available: true },
  { size: '238', length: 238, shoeSize: '38-39', available: true },
  { size: '246', length: 246, shoeSize: '39-40', available: true },
  { size: '254', length: 254, shoeSize: '40-41', available: true },
  { size: '263', length: 263, shoeSize: '42-43', available: true },
  { size: '272', length: 272, shoeSize: '43-44', available: true },
  { size: '280', length: 280, shoeSize: '44-45', available: true },
  { size: '288', length: 288, shoeSize: '45-46', available: true },
  { size: '296', length: 296, shoeSize: '46+', available: true },
];

export function SizingTable() {
  const t = useTranslations('sizing.table');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden glass rounded-lg">
              <table className="min-w-full divide-y divide-dlc-silver/10">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dlc-text-secondary uppercase tracking-wider">
                      {t('size')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dlc-text-secondary uppercase tracking-wider">
                      {t('length')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-dlc-text-secondary uppercase tracking-wider">
                      {t('shoeSize')}
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-dlc-text-secondary uppercase tracking-wider">
                      {t('availability')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dlc-silver/10">
                  {sizingData.map((row, index) => (
                    <motion.tr
                      key={row.size}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="hover:bg-dlc-silver/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {row.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dlc-text-secondary">
                        {row.length}mm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-dlc-text-secondary">
                        {row.shoeSize}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        {row.available && (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
