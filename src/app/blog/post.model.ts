export class Post {
  public id: string;
  public ownerId: string;
  public ownerEmail: string;
  public name: string;
  public info: string;
  public imagePath: string;
  public date: Date;

  constructor(name: string, info: string, imagePath: string) {
    this.name = name;
    this.info = info;
    this.imagePath = imagePath;
  }
}
