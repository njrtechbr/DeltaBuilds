import type { User, Build } from './types';

export const users: User[] = [
  { id: 'u1', name: 'Ghost', avatarUrl: 'https://placehold.co/100x100', reputation: 1350, role: 'admin' },
  { id: 'u2', name: 'Viper', avatarUrl: 'https://placehold.co/100x100', reputation: 870, role: 'user' },
  { id: 'u3', name: 'Rogue', avatarUrl: 'https://placehold.co/100x100', reputation: 420, role: 'user' },
];

export const allBaseWeapons = [
  'M4A1', 'Vector', 'AX-50', 'AK-47', 'G3',
  'AK-12', 'K416', 'K437', 'SMG-45', 'MP5',
  'QCQ-171', 'M7', 'PKM', 'AUG', 'SR-25', 'SG552',
  'QBZ95-1', 'AKM', 'PTR-32'
].sort();

export const builds: Build[] = [
  {
    id: 'b1',
    name: 'CQB Dominator',
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
    createdAt: '2024-05-18T09:00:00Z',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    galleryImageUrls: [
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
    ],
    favoritedBy: ['u2', 'u3'],
    versions: [
       { version: '2.1', steamCode: 'A7B3C9-X1Y2Z3-STEAM', patchNotes: 'Updated for the latest season. Swapped the stock for better recoil control.', createdAt: '2024-05-20T09:00:00Z', status: 'active' },
       { version: '2.0', steamCode: 'A7B3C9-X1Y2Z3-OLDSTEAM', garenaCode: 'A7B3C9-X1Y2Z3-OLDGARENA', patchNotes: 'Initial release for the season.', createdAt: '2024-05-15T11:00:00Z', status: 'active' },
    ]
  },
  {
    id: 'b2',
    name: 'Silent Ghost',
    baseWeapon: 'Vector',
    author: users[1],
    tags: ['Stealth', 'Flanking', 'Suppressed'],
    description: 'A suppressed Vector build for silent operations. Perfect for flanking the enemy and taking them out without revealing your position. The integrated suppressor and subsonic rounds make you a ghost on the battlefield.',
    upvotes: 210,
    downvotes: 5,
    comments: [],
    createdAt: '2024-05-19T14:20:00Z',
    favoritedBy: ['u1'],
    versions: [
      { version: '1.0', mobileCode: 'D4E8F1-G7H6I5-MOBILE', patchNotes: 'First version of this stealth build.', createdAt: '2024-05-19T14:20:00Z', status: 'pending' }
    ]
  },
  {
    id: 'b3',
    name: 'Long Range Precision',
    baseWeapon: 'AX-50',
    author: users[0],
    tags: ['Sniper', 'Long Range', 'Defensive'],
    description: 'The ultimate long-range sniper setup. This AX-50 build is designed for maximum accuracy and damage at extreme distances. Hold down sightlines and provide overwatch for your team. This build is not valid in the current patch.',
    upvotes: 88,
    downvotes: 2,
    comments: [],
    createdAt: '2024-05-18T21:00:00Z',
    favoritedBy: [],
    versions: [
        { version: '1.5-invalid', steamCode: 'J2K5L9-M3N1O8-STEAM', patchNotes: 'Nerfed in the last patch.', createdAt: '2024-05-18T21:00:00Z', status: 'disabled' }
    ]
  },
  {
    id: 'b4',
    name: 'All-Rounder AK',
    baseWeapon: 'AK-47',
    author: users[2],
    tags: ['Versatile', 'Mid Range', 'Reliable'],
    description: 'A balanced AK-47 build that performs well in most situations. Good for both medium-range engagements and can hold its own in close quarters. A reliable choice for any map.',
    upvotes: 150,
    downvotes: 15,
    comments: [],
    createdAt: '2024-05-21T11:00:00Z',
    favoritedBy: ['u1', 'u2'],
    versions: [
         { version: '1.0', steamCode: 'P7Q4R2-S6T5U9-STEAM', patchNotes: 'Initial release.', createdAt: '2024-05-21T11:00:00Z', status: 'active' }
    ]
  },
  {
    id: 'b5',
    name: 'Fuzil de combate G3-Conquista',
    baseWeapon: 'G3',
    author: users[2],
    tags: ['Fuzil de combate', 'Tático'],
    description: 'Uma build para o fuzil de combate G3, focada em controle e precisão. Ideal para engajamentos táticos em média distância, dominando o campo de batalha com disparos potentes e calculados.',
    upvotes: 80,
    downvotes: 5,
    comments: [],
    createdAt: '2024-05-23T10:00:00Z',
    favoritedBy: [],
    versions: [
        { version: '1.0', garenaCode: 'Fuzil de combate G3-Conquista-6H3LATG081MQDPAGJAK1I', patchNotes: 'Versão inicial focada no modo Conquista.', createdAt: '2024-05-23T10:00:00Z', status: 'active' }
    ]
  }
];

export const reportedCodes = [
    { buildId: 'b3', version: '1.5-invalid', code: 'J2K5L9-M3N1O8-STEAM', platform: 'Steam', reportedAt: '2024-05-24T10:00:00Z', reporter: users[1] },
    { buildId: 'b1', version: '2.0', code: 'A7B3C9-X1Y2Z3-OLDGARENA', platform: 'Garena', reportedAt: '2024-05-23T15:00:00Z', reporter: users[2] },
];
