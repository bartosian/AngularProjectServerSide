export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public _id?: number,
    public authToken?: string
  ) {}
}
