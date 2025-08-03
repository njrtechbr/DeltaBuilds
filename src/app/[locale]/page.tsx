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
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageLayout from './page-layout';

type CodeType = 'steam' | 'garena' | 'mobile';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState('');
  const [weaponFilter, setWeaponFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('popular');
  const [codeTypeFilter, setCodeTypeFilter] = useState<CodeType[]>([]);

  const weaponTypes = ['all', ...Array.from(new Set(allBuilds.map(b => b.baseWeapon)))];

  const handleCodeTypeChange = (type: CodeType) => {
    setCodeTypeFilter(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const filteredAndSortedBuilds = allBuilds
    .filter((build: Build) => {
      const latestVersion = build.versions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
      if (latestVersion.status !== 'active') return false;

      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        build.name.toLowerCase().includes(searchTermLower) ||
        build.author.name.toLowerCase().includes(searchTermLower) ||
        build.tags.some(tag => tag.toLowerCase().includes(searchTermLower));

      const matchesWeapon =
        weaponFilter === 'all' || build.baseWeapon === weaponFilter;

      
      const matchesCodeType =
        codeTypeFilter.length === 0 ||
        codeTypeFilter.some(type => {
            if (type === 'steam') return !!latestVersion.steamCode;
            if (type === 'garena') return !!latestVersion.garenaCode;
            if (type === 'mobile') return !!latestVersion.mobileCode;
            return false;
        });

      return matchesSearch && matchesWeapon && matchesCodeType;
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
    <PageLayout>
        <div className="space-y-8">
        <PageHeader
            title={t('title')}
            description={t('description')}
        />

        <Card>
        <CardHeader>
            <CardTitle className="text-xl font-headline">{t('filtersTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="lg:col-span-1"
            />
            <div className="grid grid-cols-2 gap-4">
                <Select value={weaponFilter} onValueChange={setWeaponFilter}>
                    <SelectTrigger>
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
                    <SelectTrigger>
                    <SelectValue placeholder={t('sortByPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="popular">{t('popular')}</SelectItem>
                    <SelectItem value="newest">{t('newest')}</SelectItem>
                    <SelectItem value="oldest">{t('oldest')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                <Label>{t('codeTypeTitle')}</Label>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox id="steam" onCheckedChange={() => handleCodeTypeChange('steam')} checked={codeTypeFilter.includes('steam')} />
                        <Label htmlFor="steam">Steam</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="garena" onCheckedChange={() => handleCodeTypeChange('garena')} checked={codeTypeFilter.includes('garena')}/>
                        <Label htmlFor="garena">Garena</Label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="mobile" onCheckedChange={() => handleCodeTypeChange('mobile')} checked={codeTypeFilter.includes('mobile')}/>
                        <Label htmlFor="mobile">Mobile</Label>
                    </div>
                </div>
            </div>
        </CardContent>
        </Card>

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
    </PageLayout>
  );
}
