'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/technology', label: t('technology') },
    { href: '/player-vs-goalie', label: t('playerVsGoalie') },
    { href: '/sizing', label: t('sizing') },
    { href: '/sharpening', label: t('sharpening') },
    { href: '/reviews', label: t('reviews') },
    { href: '/warranty', label: t('warranty') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => {
    const path = pathname.replace(`/${locale}`, '');
    return path === href || (href === '/' && path === '');
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full glass">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-xl font-cormorant font-semibold text-gradient">
                JRZ Pro Black DLC
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center ml-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-dlc-silver whitespace-nowrap',
                    isActive(item.href)
                      ? 'text-dlc-silver'
                      : 'text-dlc-text-secondary'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Language Switcher */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs uppercase">{locale}</span>
                </Button>
                <div className="absolute right-0 mt-2 w-24 glass rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href={pathname.replace(`/${locale}`, '/ru') as any}
                    className={cn(
                      'block px-4 py-2 text-sm hover:bg-dlc-silver/10',
                      locale === 'ru' && 'text-dlc-silver'
                    )}
                  >
                    RU
                  </Link>
                  <Link
                    href={pathname.replace(`/${locale}`, '/en') as any}
                    className={cn(
                      'block px-4 py-2 text-sm hover:bg-dlc-silver/10',
                      locale === 'en' && 'text-dlc-silver'
                    )}
                  >
                    EN
                  </Link>
                </div>
              </div>

              {/* Shop Button */}
              <Link href={`/${locale}/shop`}>
                <Button variant="outline" size="sm">
                  {t('shop')}
                </Button>
              </Link>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-dlc-gold text-dlc-bg text-xs font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden glass border-t border-dlc-silver/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block py-2 text-lg font-medium transition-colors hover:text-dlc-silver',
                      isActive(item.href)
                        ? 'text-dlc-silver'
                        : 'text-dlc-text-secondary'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
