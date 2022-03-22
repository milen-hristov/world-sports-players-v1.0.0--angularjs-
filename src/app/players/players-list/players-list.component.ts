import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";

import { PlayersService } from "../players.service";
import { Player } from "../player.model";
import { HandleError } from "src/app/shared/handleError.service";

@Component({
  selector: "app-players-list",
  templateUrl: "./players-list.component.html",
  styleUrls: ["./players-list.component.css"],
})
export class PlayersListComponent implements OnInit {
  players: Player[] | undefined;
  isLoading = false;
  message: string = null;

  constructor(private playersService: PlayersService, private handleError: HandleError) {}

  ngOnInit() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    this.isLoading = true;
    this.players = undefined;
    this.playersService
      .getPlayers()
      .pipe(
        map((responseData) => {
          const postsArray: Player[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe({
        next: (players) => {
          this.players = players;
          this.isLoading = false;
          // console.log(this.players);
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          this.isLoading = false;
          console.log(err);
        }
      });
  }
}
