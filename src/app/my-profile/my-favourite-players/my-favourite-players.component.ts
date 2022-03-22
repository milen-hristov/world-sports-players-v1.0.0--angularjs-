import { Component, Input, OnInit } from "@angular/core";
import { Player } from "src/app/players/player.model";

@Component({
  selector: "app-my-favourite-players",
  templateUrl: "./my-favourite-players.component.html",
  styleUrls: ["./my-favourite-players.component.css"],
})
export class MyFavouritePlayersComponent implements OnInit {
  @Input() player: Player;
  @Input() isLoadingMyFav: boolean;

  constructor() {}

  ngOnInit(): void {}
}
