export interface IUser {
  id: string;
  name: string;
  email: string;
  country: string;
  image: string;
  role: string;
  communities: string[];
}

export interface IPost {
  _id: object;
  title: string;
  body: string;
  summary: string;
  likes: number;
  status: string;
  score: number;
  country: string;
}

export interface ICommunity {
  _id: object;
  title: string;
  image: string;
  membersCount: number;
}

export enum UserRoleEnum {
  MODERATOR = "moderator",
  SUPER_MODERATOR = "super-moderator",
}

export enum PostStatusEnum {
  PENDING = "pending",
  APPROVER = "approvee",
}
