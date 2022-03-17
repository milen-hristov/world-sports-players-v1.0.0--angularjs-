import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { PlayersService } from '../players.service';
import { Player } from '../player.model';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  players: Player[] = [];
  subscription: Subscription;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.subscription = this.playersService.playersChanged
      .subscribe(
        (players: Player[]) => {
          this.players = players;
        }
      );
    this.players = this.playersService.getPlayers();
  }

}
