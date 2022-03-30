import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';

import { PlayersService } from '../players/players.service';
import { Player } from '../players/player.model';
import { PlayerFav } from '../players/playerFav.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { HandleError } from '../shared/handleError.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        query(':enter', [
          style({
            opacity: '0',
          }),
          stagger(30, [animate('300ms ease-in', style({ opacity: 1 }))]),
        ]),
      ]),
      transition('* => void', animate('300ms ease-out', style({ opacity: 0 }))),
    ]),
  ],
})
export class MyProfileComponent implements OnInit {
  allPlayers: Player[] | undefined;
  myPlayers: Player[] | undefined;
  myFavPlayers: Player[] | undefined;
  currentUser: User;
  isLoadingCreated: boolean = false;
  isLoadingMyFav: boolean = false;
  message: string = null;
  showLessCreatedPlayers: boolean = false;
  showLessFavouritePlayers: boolean = false;

  constructor(
    private playersService: PlayersService,
    private authService: AuthService,
    private handleError: HandleError
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
    this.fetchPlayers();
    this.fetchMyCreatedPlayers();
  }

  fetchMyCreatedPlayers() {
    this.isLoadingCreated = true;
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
        map((playersArr) =>
          playersArr.filter((player) => player.owner == this.currentUser.id)
        )
      )
      .subscribe({
        next: (players) => {
          this.myPlayers = players;
          this.isLoadingCreated = false;
        },
        error: (err) => {
          console.log(err);
          this.message = this.handleError.handleErrorPlayer(err);
          this.isLoadingCreated = false;
        },
      });
  }

  fetchPlayers() {
    this.isLoadingMyFav = true;
    this.allPlayers = undefined;
    this.playersService
      .getPlayers()
      .pipe(
        map((responseData) => {
          const playerArr: Player[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              playerArr.push({ ...responseData[key], id: key });
            }
          }
          return playerArr;
        })
      )
      .subscribe((players) => {
        this.allPlayers = players;
        this.myFavPlayers = undefined;
        this.playersService
          .getFavouriteList()
          .pipe(
            map((myFavRes) => {
              const favouriteListArr: PlayerFav[] = [];
              for (const key in myFavRes) {
                if (myFavRes.hasOwnProperty(key)) {
                  favouriteListArr.push({ ...myFavRes[key], isFavID: key });
                }
              }

              const result = favouriteListArr.filter(
                (player) => player.owner == this.currentUser.id
              );

              return result;
            }),
            map((responseData) => {
              const favArrIDs = [];
              for (const key in responseData) {
                favArrIDs.push(responseData[key].id);
              }
              return favArrIDs;
            })
          )
          .subscribe({
            next: (favouriteListRes) => {
              let result = this.allPlayers.filter((x) =>
                favouriteListRes.includes(x.id)
              );
              this.myFavPlayers = result;
              this.isLoadingMyFav = false;
            },
            error: (err) => {
              this.message = this.handleError.handleErrorPlayer(err);
              console.log(err);
              this.isLoadingMyFav = false;
            },
          });
      });
  }

  onShowLessCreatedPlayers() {
    this.showLessCreatedPlayers = !this.showLessCreatedPlayers;
  }

  onShowLessFavouritePlayers() {
    this.showLessFavouritePlayers = !this.showLessFavouritePlayers;
  }
}
