'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Build } from '@/lib/types';
import { builds as allBuilds } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BuildListItem } from '@/components/build-list-item';
import { PageHeader } from '@/components/page-header';
import { useLocale } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [weaponFilter, setWeaponFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('popular');

  const weaponTypes = ['all', ...Array.from(new Set(allBuilds.map(b => b.baseWeapon)))];

  const filteredAndSortedBuilds = allBuilds
    .filter((build: Build) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        build.name.toLowerCase().includes(searchTermLower) ||
        build.author.name.toLowerCase().includes(searchTermLower) ||
        build.tags.some(tag => tag.toLowerCase().includes(searchTermLower));

      const matchesWeapon =
        weaponFilter === 'all' || build.baseWeapon === weaponFilter;

      return matchesSearch && matchesWeapon;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'popular':
          return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('title')}
        description={t('description')}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:max-w-xs"
        />
        <div className="flex gap-4">
          <Select value={weaponFilter} onValueChange={setWeaponFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('filterByWeaponPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {weaponTypes.map(weapon => (
                <SelectItem key={weapon} value={weapon}>
                  {weapon === 'all' ? t('allWeapons') : weapon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={t('sortByPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">{t('popular')}</SelectItem>
              <SelectItem value="newest">{t('newest')}</SelectItem>
              <SelectItem value="oldest">{t('oldest')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAndSortedBuilds.length > 0 ? (
        <div className="border rounded-lg">
            <div className="space-y-0">
                {filteredAndSortedBuilds.map((build, index) => (
                    <BuildListItem 
                        key={build.id} 
                        build={build} 
                        isLast={index === filteredAndSortedBuilds.length - 1}
                        locale={locale}
                    />
                ))}
            </div>
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
          <h3 className="text-xl font-semibold">{t('noBuildsFound')}</h3>
          <p>{t('adjustFilters')}</p>
        </div>
      )}
    </div>
  );
}
