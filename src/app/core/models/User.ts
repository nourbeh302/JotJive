export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  imageUrl: string;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    imageUrl: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.imageUrl = imageUrl;
  }
}
