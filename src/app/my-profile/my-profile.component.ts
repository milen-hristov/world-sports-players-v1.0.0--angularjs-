import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";

import { PlayersService } from "../players/players.service";
import { Player } from "../players/player.model";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  myPlayers: Player[] | undefined;
  currentUser: User;
  isLoading = false;

  constructor(
    private playersService: PlayersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.currentUser = user;
    });

    this.fetchMyCreatedPlayers();
  }

  fetchMyCreatedPlayers() {
    this.isLoading = true;
    this.myPlayers = undefined;
    this.playersService
      .getPlayers()
      .pipe(
        map((responseData) => {
          const playersArr: Player[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              playersArr.push({ ...responseData[key], id: key });
            }
          }
          return playersArr;
        }),
        map(playersArr => playersArr.filter(player => player.owner == this.currentUser.id)),
      )
      .subscribe((players) => {
        this.myPlayers = players;
        this.isLoading = false;
        console.log(this.myPlayers);
      });
  }
}
