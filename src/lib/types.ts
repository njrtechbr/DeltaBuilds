export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  reputation: number;
};

export type Comment = {
  id: string;
  text: string;
  author: User;
  createdAt: string;
};

export type BuildVersion = {
  version: string;
  shareCode: string;
  patchNotes?: string;
  createdAt: string;
  isValid: boolean;
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
  imageUrl: string;
  imageHint: string;
  youtubeUrl?: string;
  galleryImageUrls?: string[];
  versions: BuildVersion[];
  favoritedBy: string[]; // Array of user IDs
};
