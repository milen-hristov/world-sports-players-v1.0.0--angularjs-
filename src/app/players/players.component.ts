import { Component, OnInit } from '@angular/core';

import { Player } from './player.model';
import { PlayersService } from './players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayersService]
})
export class PlayersComponent implements OnInit {
  selectedPlayer: Player;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
    this.playersService.selectedPlayer
      .subscribe((player: Player) => {
        this.selectedPlayer = player;
      });
  }
}
