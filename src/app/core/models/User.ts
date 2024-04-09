export class User {
  id: number;
  email: string;
  password: string;
  photoUrl: string;

  constructor(
    id: number,
    email: string,
    password: string,
    photoUrl: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.photoUrl = photoUrl;
  }
}
