import { Component, OnInit } from '@angular/core';

import { PlayersService } from '../players.service';
import { Player } from '../player.model';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playersService: PlayersService) { }

  ngOnInit(){
    this.players = this.playersService.getPlayers();
    console.log(this.players)
  }

}
