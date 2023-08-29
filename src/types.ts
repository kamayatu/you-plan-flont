export interface userType {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: postType[];
  profile: profileType;
}

export interface postType {
  id: number;
  title: string;
  content: string;
  five: string;
  six: string;
  seven: string;
  eight: string;
  nine: string;
  ten: string;
  eleven: string;
  twelve: string;
  createdAt: string;
  authorId: number;
  author: userType;
  good: goodType[];
  comment: commentType[];
}

export interface profileType {
  id: number;
  bio: string;
  userId: number;
  user: userType;
}

export interface goodType {
  id: number;
  userId: number;
  user: userType;
  postId: number;
  post: postType;
}

export interface commentType {
  id: number;
  comment: string;
  userId: number;
  user: userType;
  postId: number;
  post: postType;
  createdAt: string;
}
