import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";

import { PlayersService } from "../players.service";
import { Player } from "../player.model";
import { HandleError } from "src/app/shared/handleError.service";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-players-list",
  templateUrl: "./players-list.component.html",
  styleUrls: ["./players-list.component.css"],
  animations: [
    trigger('fade', [
      transition('void => *', [
        query(':enter', [
          style({
            opacity: '0'
          }),
          stagger(30, [
            animate('300ms ease-in', style({ opacity: 1 }))
          ])
        ])
      ]),
      transition('* => void', animate('300ms ease-out', style({ opacity: 0 })))
    ])
  ]
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
