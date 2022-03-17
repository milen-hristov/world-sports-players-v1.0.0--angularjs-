import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Player } from '../player.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.css']
})
export class PlayersDetailsComponent implements OnInit {
  player: Player;
  id: number;

  constructor(private playersService: PlayersService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = Number(params['id']);
          this.player = this.playersService.getPlayer(this.id);
        }
      );
  }

  onEditPlayer() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
