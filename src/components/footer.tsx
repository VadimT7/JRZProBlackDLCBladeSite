import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const sections = [
    {
      title: t('sections.product.title'),
      links: [
        { href: '/technology', label: t('sections.product.technology') },
        { href: '/player-vs-goalie', label: t('sections.product.playerVsGoalie') },
        { href: '/sizing', label: t('sections.product.sizing') },
        { href: '/sharpening', label: t('sections.product.sharpening') },
      ],
    },
    {
      title: t('sections.support.title'),
      links: [
        { href: '/warranty', label: t('sections.support.warranty') },
        { href: '/warranty#returns', label: t('sections.support.returns') },
        { href: '/contact', label: t('sections.support.contact') },
        { href: '/reviews', label: t('sections.support.reviews') },
      ],
    },
    {
      title: t('sections.legal.title'),
      links: [
        { href: '/legal', label: t('sections.legal.title') },
        { href: '/legal/payment', label: t('sections.legal.payment') },
        { href: '/legal/delivery', label: t('sections.legal.delivery') },
        { href: '/legal/privacy', label: t('sections.legal.privacy') },
      ],
    },
  ];

  return (
    <footer className="border-t border-dlc-silver/10 bg-dlc-elevation/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-cormorant font-semibold text-gradient mb-4">
              JRZ Pro Black DLC
            </h3>
            <p className="text-sm text-dlc-text-secondary">
              {useTranslations('common')('tagline')}
            </p>
          </div>

          {/* Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-dlc-text-secondary hover:text-dlc-silver transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-dlc-silver/10">
          <p className="text-center text-sm text-dlc-text-secondary">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
