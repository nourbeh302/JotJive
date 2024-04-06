import { User } from './User';

export class Blog {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: User;

  constructor(
    id: number,
    title: string,
    description: string,
    createdAt: Date,
    createdBy: User
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}
