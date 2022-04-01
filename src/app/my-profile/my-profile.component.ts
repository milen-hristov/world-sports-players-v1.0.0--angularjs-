import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';

import { AuthService } from '../auth/auth.service';
import { HandleError } from '../shared/handleError.service';
import { Player } from '../players/player.model';
import { User } from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import * as PlayerActions from '../my-profile/store/myProfile.actions';

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
          stagger(30, [animate('800ms ease-in', style({ opacity: 1 }))]),
        ]),
      ]),
      transition('* => void', animate('800ms ease-out', style({ opacity: 0 }))),
    ]),
  ],
})
export class MyProfileComponent implements OnInit, OnDestroy {
  allPlayers: Player[] | undefined;
  myPlayers: Player[] | undefined;
  myFavPlayers: Player[] | undefined;
  currentUser: User;
  isLoadingCreated: boolean = false;
  isLoadingMyFav: boolean = false;
  message: string = null;
  showLessCreatedPlayers: boolean = false;
  showLessFavouritePlayers: boolean = false;
  allPlayersState: Subscription;
  myCreatedPlayersState: Subscription;
  myFavouritePlayersState: Subscription;

  constructor(
    private authService: AuthService,
    private handleError: HandleError,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });

    this.loadAllPlayersState();
    this.loadFavPlayersState();

    this.allPlayersState = this.getState().subscribe({
      next: (stateResponse) => {
        this.allPlayers = stateResponse.players;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingCreated = false;
        this.isLoadingMyFav = false;
      },
    });

    this.myCreatedPlayersState = this.getState().subscribe({
      next: (stateResponse) => {
        this.myPlayers = stateResponse.players.filter(
          (player) => player.owner == this.currentUser.id
        );
        this.isLoadingCreated = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadingCreated = false;
      },
    });

    this.myFavouritePlayersState = this.getState()
      .pipe(
        map((stateResponse) => stateResponse.favPlayers),
        map((allFavPlayers) => {
          let filteredFavPlayers = allFavPlayers.filter(
            (x) => x.owner == this.currentUser.id
          );
          return filteredFavPlayers;
        }),
        map((myFavIds) => {
          const favArrIDs = [];
          for (const key in myFavIds) {
            favArrIDs.push(myFavIds[key].id);
          }
          return favArrIDs;
        })
      )
      .subscribe((favResponse) => {
        this.myFavPlayers = this.allPlayers.filter((x) =>
          favResponse.includes(x.id)
        );
        this.isLoadingMyFav = false;
      });
  }

  loadAllPlayersState() {
    this.store.dispatch(PlayerActions.fetchPlayers());
    return this.actions$.pipe(ofType(PlayerActions.setPlayers), take(1));
  }

  loadFavPlayersState() {
    this.store.dispatch(PlayerActions.fetchFavPlayers());
    return this.actions$.pipe(ofType(PlayerActions.setFavPlayers), take(1));
  }

  getState() {
    this.isLoadingCreated = true;
    this.isLoadingMyFav = true;
    return this.store.select('myProfilePlayers').pipe(
      tap({
        next: (resData) => {
          return resData;
        },
        error: (error) => {
          this.handleError.handleError(error);
          this.isLoadingMyFav = false;
          this.isLoadingCreated = false;
        },
      })
    );
  }

  onShowLessCreatedPlayers() {
    this.showLessCreatedPlayers = !this.showLessCreatedPlayers;
  }

  onShowLessFavouritePlayers() {
    this.showLessFavouritePlayers = !this.showLessFavouritePlayers;
  }

  ngOnDestroy() {
    if (this.allPlayersState) {
      this.allPlayersState.unsubscribe();
    }
    if (this.myCreatedPlayersState) {
      this.myCreatedPlayersState.unsubscribe();
    }
    if (this.myFavouritePlayersState) {
      this.myFavouritePlayersState.unsubscribe();
    }
  }
}
