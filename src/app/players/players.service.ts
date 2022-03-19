import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Player } from './player.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PlayersService {
  constructor(private http: HttpClient) {}

  getPlayers() {
    return this.http.get<Player[]>(
      `${environment.databaseURL}/players.json`
    );
  }

  getPlayer(id: string) {
    return this.http.get<Player>(
      `${environment.databaseURL}/players/${id}.json`
    );
  }

  addPlayer(player: Player) {
    return this.http.post<Player>(
      `${environment.databaseURL}/players.json`,
      player
    );
  }

  updatePlayer(id: string, updatedPlayer: Player) {
    return this.http.put<Player>(
      `${environment.databaseURL}/players/${id}.json`,
      updatedPlayer
    );
  }

  deletePlayer(id: string) {
    return this.http.delete(
      `${environment.databaseURL}/players/${id}.json`
    );
  }
}
