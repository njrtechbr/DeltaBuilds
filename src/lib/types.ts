export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  reputation: number;
  role: 'admin' | 'user';
  status: 'active' | 'banned';
  bio?: string;
  socials?: {
    youtube?: string;
    twitch?: string;
    instagram?: string;
    facebook?: string;
    x?: string;
  }
};

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
};

export type BuildStatus = 'active' | 'pending' | 'disabled';

export type BuildVersion = {
  version: string;
  steamCode?: string;
  garenaCode?: string;
  mobileCode?: string;
  patchNotes?: string;
  createdAt: string;
  status: BuildStatus;
};

export type Build = {
  id:string;
  name: string;
  baseWeapon: string;
  author: User;
  tags: string[];
  description: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  createdAt: string;
  youtubeUrl?: string;
  galleryImageUrls?: string[];
  versions: BuildVersion[];
  favoritedBy: string[]; // Array of user IDs
};
