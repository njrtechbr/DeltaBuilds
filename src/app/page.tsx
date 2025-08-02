'use client';

import { useState } from 'react';
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
import { BuildCard } from '@/components/build-card';
import { PageHeader } from '@/components/page-header';

export default function Home() {
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
          return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
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
        title="Discover Builds"
        description="Find the perfect weapon build for your playstyle."
      />

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name, author, or tag..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full md:max-w-xs"
        />
        <div className="flex gap-4">
          <Select value={weaponFilter} onValueChange={setWeaponFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by weapon" />
            </SelectTrigger>
            <SelectContent>
              {weaponTypes.map(weapon => (
                <SelectItem key={weapon} value={weapon}>
                  {weapon === 'all' ? 'All Weapons' : weapon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAndSortedBuilds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedBuilds.map(build => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <h3 className="text-xl font-semibold">No builds found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
