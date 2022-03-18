import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

import { Player } from '../player.model';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.css']
})
export class PlayersDetailsComponent implements OnInit {
  player: Player;
  id: string;

  isOwner: boolean;
  ownerID: string;
  currentUserID: string;

  constructor(private playersService: PlayersService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.playersService.getPlayer(this.id).subscribe((player) => {
            this.player = player;
            this.ownerID = player.owner;

            let userData = this.authService.getUserID();
            this.currentUserID = userData.id;

            if (this.ownerID === this.currentUserID) {
              this.isOwner = true;
            } else {
              this.isOwner = false;
            }
          });
        }
      );
  }

  onEditPlayer() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeletePlayer() {
    this.playersService.deletePlayer(this.id).subscribe({
      next: () => {
        this.router.navigate(['/players']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
