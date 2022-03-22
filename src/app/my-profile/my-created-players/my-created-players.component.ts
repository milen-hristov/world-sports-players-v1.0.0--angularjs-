import { Component, Input, OnInit } from "@angular/core";
import { Player } from "src/app/players/player.model";

@Component({
  selector: "app-my-created-players",
  templateUrl: "./my-created-players.component.html",
  styleUrls: ["./my-created-players.component.css"],
})
export class MyCreatedPlayersComponent implements OnInit {
  @Input() player: Player;
  @Input() isLoadingCreated: boolean;

  constructor() {}

  ngOnInit(): void {}
}
