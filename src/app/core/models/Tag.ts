import { Blog } from './Blog';

export class Tag {
  id: number;
  name: string;
  Blog: Blog;

  constructor(
    id: number,
    name: string,
    Blog: Blog
  ) {
    this.id = id;
    this.name = name;
    this.Blog = Blog;
  }
}
