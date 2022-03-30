export class Comment {
  public id: string;
  public ownerId: string;
  public ownerEmail: string;
  public postId: string;
  public info: string;
  public date: Date;

  constructor(info: string) {
    this.info = info;
  }
}
