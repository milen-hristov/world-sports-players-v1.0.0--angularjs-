export class UserData {
  constructor(
    public email: string,
    public id: string,
  ) { }

  get userID() {
    if (!this.id) {
      return null;
    }
    return this.id;
  }
}