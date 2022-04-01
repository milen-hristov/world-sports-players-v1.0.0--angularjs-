import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PlayersActions from './myProfile.actions';
import { Player } from 'src/app/players/player.model';
import { PlayerFav } from 'src/app/players/playerFav.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PlayerEffects {
  fetchPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersActions.fetchPlayers),
      switchMap(() => {
        return this.http.get<Player[]>(
          `${environment.databaseURL}/players/list.json`
        );
      }),
      map((responseData) => {
        const playersArr: Player[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            playersArr.push({ ...responseData[key], id: key });
          }
        }
        return playersArr;
      }),
      map((players) => {
        return PlayersActions.setPlayers({ players });
      })
    )
  );

  fetchFavPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayersActions.fetchFavPlayers),
      switchMap(() => {
        return this.http.get<PlayerFav[]>(
          `${environment.databaseURL}/players/favourites.json`
        );
      }),
      map((responseData) => {
        const favPlayersArr: PlayerFav[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            favPlayersArr.push({ ...responseData[key], isFavID: key });
          }
        }
        return favPlayersArr;
      }),
      map((favPlayers: PlayerFav[]) => {
        return PlayersActions.setFavPlayers({ favPlayers });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
