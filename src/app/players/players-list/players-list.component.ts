import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { PlayersService } from '../players.service';
import { Player } from '../player.model';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  players: Player[] | undefined;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.fetchPlayers();
  }

  fetchPlayers() {
    this.players = undefined;
    this.playersService.getPlayers()
      .pipe(
        map(responseData => {
          const postsArray: Player[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
      )
      .subscribe(players => {
        this.players = players;
        console.log(this.players);
      });
  }
}