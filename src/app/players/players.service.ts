import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Player } from './player.model';
import { environment } from '../../environments/environment';
import { PlayerLike } from './playerLike.model';
import { PlayerFav } from './playerFav.model';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  constructor(private http: HttpClient) {}

  getPlayers() {
    return this.http.get<Player[]>(`${environment.databaseURL}/players/list.json`);
  }

  getPlayer(id: string) {
    return this.http.get<Player>(
      `${environment.databaseURL}/players/list/${id}.json`
    );
  }

  addPlayer(player: Player) {
    return this.http.post<Player>(
      `${environment.databaseURL}/players/list.json`,
      player
    );
  }

  updatePlayer(id: string, updatedPlayer: Player) {
    return this.http.put<Player>(
      `${environment.databaseURL}/players/list/${id}.json`,
      updatedPlayer
    );
  }

  deletePlayer(id: string) {
    return this.http.delete(`${environment.databaseURL}/players/list/${id}.json`);
  }

  likePlayer(currentLike: PlayerLike) {
    return this.http.post<PlayerLike>(
      `${environment.databaseURL}/players/likes.json`,
      currentLike
    );
  }

  getPlayerLikes() {
    return this.http.get<PlayerLike[]>(`${environment.databaseURL}/players/likes.json`);
  }

  addFavPlayer(currentFav: PlayerFav) {
    return this.http.post<PlayerFav>(
      `${environment.databaseURL}/players/favourites.json`,
      currentFav
    );
  }

  getFavouriteList() {
    return this.http.get<PlayerFav[]>(
      `${environment.databaseURL}/players/favourites.json`
    );
  }

  removeFavPlayer(id: string) {
    return this.http.delete(`${environment.databaseURL}/players/favourites/${id}.json`);
  }
}
