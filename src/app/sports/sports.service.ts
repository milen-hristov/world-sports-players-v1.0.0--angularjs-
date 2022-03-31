import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Sport } from './sport.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SportsService {
  constructor(private http: HttpClient) {}

  getSports() {
    return this.http.get<Sport[]>(`${environment.databaseURL}/players/sports.json`);
  }

  addSport(player: Sport) {
    return this.http.post<Sport>(
      `${environment.databaseURL}/players/sports.json`,
      player
    );
  }
}
