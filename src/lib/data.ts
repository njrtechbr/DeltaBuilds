import type { User, Build } from './types';

export const users: User[] = [
  { id: 'u1', name: 'Ghost', avatarUrl: 'https://placehold.co/100x100', reputation: 1350 },
  { id: 'u2', name: 'Viper', avatarUrl: 'https://placehold.co/100x100', reputation: 870 },
  { id: 'u3', name: 'Rogue', avatarUrl: 'https://placehold.co/100x100', reputation: 420 },
];

export const builds: Build[] = [
  {
    id: 'b1',
    name: 'CQB Dominator',
    shareCode: 'A7B3C9-X1Y2Z3',
    baseWeapon: 'M4A1',
    author: users[0],
    tags: ['Aggressive', 'Close Quarters', 'Run & Gun'],
    description: 'This M4A1 build is optimized for aggressive, close-quarters combat. High rate of fire and mobility make it perfect for clearing rooms and pushing objectives. The short barrel and laser sight ensure quick target acquisition.',
    upvotes: 125,
    downvotes: 10,
    comments: [
      { id: 'c1', text: 'This build shreds! Thanks for sharing.', author: users[1], createdAt: '2024-05-20T10:30:00Z' },
      { id: 'c2', text: 'A bit too much recoil for my taste, but effective up close.', author: users[2], createdAt: '2024-05-20T12:45:00Z' },
    ],
    isValid: true,
    createdAt: '2024-05-20T09:00:00Z',
    imageUrl: 'https://placehold.co/600x400',
    imageHint: 'assault rifle',
    version: '2.1',
    patchNotes: 'Updated for the latest season. Swapped the stock for better recoil control.'
  },
  {
    id: 'b2',
    name: 'Silent Ghost',
    shareCode: 'D4E8F1-G7H6I5',
    baseWeapon: 'Vector',
    author: users[1],
    tags: ['Stealth', 'Flanking', 'Suppressed'],
    description: 'A suppressed Vector build for silent operations. Perfect for flanking the enemy and taking them out without revealing your position. The integrated suppressor and subsonic rounds make you a ghost on the battlefield.',
    upvotes: 210,
    downvotes: 5,
    comments: [],
    isValid: true,
    createdAt: '2024-05-19T14:20:00Z',
    imageUrl: 'https://placehold.co/600x400',
    imageHint: 'smg gun',
    version: '1.0'
  },
  {
    id: 'b3',
    name: 'Long Range Precision',
    shareCode: 'J2K5L9-M3N1O8',
    baseWeapon: 'AX-50',
    author: users[0],
    tags: ['Sniper', 'Long Range', 'Defensive'],
    description: 'The ultimate long-range sniper setup. This AX-50 build is designed for maximum accuracy and damage at extreme distances. Hold down sightlines and provide overwatch for your team. This build is not valid in the current patch.',
    upvotes: 88,
    downvotes: 2,
    comments: [],
    isValid: false,
    createdAt: '2024-05-18T21:00:00Z',
    imageUrl: 'https://placehold.co/600x400',
    imageHint: 'sniper rifle',
    version: '1.5-invalid'
  },
  {
    id: 'b4',
    name: 'All-Rounder AK',
    shareCode: 'P7Q4R2-S6T5U9',
    baseWeapon: 'AK-47',
    author: users[2],
    tags: ['Versatile', 'Mid Range', 'Reliable'],
    description: 'A balanced AK-47 build that performs well in most situations. Good for both medium-range engagements and can hold its own in close quarters. A reliable choice for any map.',
    upvotes: 150,
    downvotes: 15,
    comments: [],
    isValid: true,
    createdAt: '2024-05-21T11:00:00Z',
    imageUrl: 'https://placehold.co/600x400',
    imageHint: 'ak47 rifle',
    version: '1.0'
  },
  {
    id: 'b5',
    name: 'Conquistador G3',
    shareCode: 'G3-Conquista-6H3LATG081MQDPAGJAK1I',
    baseWeapon: 'G3',
    author: users[2],
    tags: ['Long Range', 'High Damage', 'Tactical'],
    description: 'A powerful G3 build designed for long-range engagements. High damage output makes it a threat in open areas, but it requires careful positioning due to its lower fire rate and higher recoil.',
    upvotes: 75,
    downvotes: 8,
    comments: [],
    isValid: true,
    createdAt: '2024-05-22T18:00:00Z',
    imageUrl: 'https://placehold.co/600x400',
    imageHint: 'battle rifle',
    version: '1.0'
  }
];
