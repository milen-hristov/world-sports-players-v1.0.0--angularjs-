import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Sport } from './sport.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SportsService {
  constructor(private http: HttpClient) {}

  getSports() {
    return this.http.get<Sport[]>(
      `${environment.databaseURL}/sports.json`
    );
  }

  addSport(player: Sport) {
    return this.http.post<Sport>(
      `${environment.databaseURL}/sports.json`,
      player
    );
  }

//   updatePlayer(id: string, updatedPlayer: Player) {
//     return this.http.put<Player>(
//       `${environment.databaseURL}/players/${id}.json`,
//       updatedPlayer
//     );
//   }

//   deletePlayer(id: string) {
//     return this.http.delete(
//       `${environment.databaseURL}/players/${id}.json`
//     );
//   }
}
