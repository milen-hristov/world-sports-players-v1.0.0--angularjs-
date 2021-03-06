export class Player {
  public id: string;
  public owner: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public country: string;
  public dob: string;
  public achievements: string;
  public active: string;
  public sport: string;

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    country: string,
    dob: string,
    achievements: string,
    active: string,
    sport: string
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.country = country;
    this.dob = dob;
    this.achievements = achievements;
    this.active = active;
    this.sport = sport;
  }
}
