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

export type Build = {
  id: string;
  name: string;
  shareCode: string;
  baseWeapon: string;
  author: User;
  tags: string[];
  description: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  isValid: boolean;
  createdAt: string;
  imageUrl: string;
  imageHint: string;
};
