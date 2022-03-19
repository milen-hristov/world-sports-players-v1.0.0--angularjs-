import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { PlayersService } from '../players.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import countryListExport from '../../shared/countryList';

@Component({
  selector: 'app-players-create',
  templateUrl: './players-create.component.html',
  styleUrls: ['./players-create.component.css']
})
export class PlayersCreateComponent implements OnInit {
  id: string;
  editMode = false;
  playerForm: FormGroup;
  currentUser: User;
  countryList: { name: string; code: string }[];

  constructor(private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.currentUser = user;
    });

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });

      this.countryList = countryListExport;
  }

  onSubmit() {
    if (this.editMode) {
      this.playersService.updatePlayer(this.id, this.playerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/players']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.playersService.addPlayer(this.playerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/players']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    // this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let playerName = '';
    let playerCountry = '';
    let playerDesc = '';
    let playerImg = '';
    let playerDOB = '';
    let playerAchievements = '';
    let playerActive = false;
    let playerSport = '';
    let owner = this.currentUser.id;

    if (this.editMode) {
      this.playersService.getPlayer(this.id).subscribe((player) => {
        this.playerForm.patchValue({
          name: player.name,
          country: player.country,
          description: player.description,
          imagePath: player.imagePath,
          dob: player.dob,
          achievements: player.achievements,
          active: player.active,
          sport: player.sport
        });
      });
    }

    this.playerForm = new FormGroup({
      'name': new FormControl(playerName),
      'country': new FormControl(playerCountry),
      'description': new FormControl(playerDesc),
      'imagePath': new FormControl(playerImg),
      'dob': new FormControl(playerDOB),
      'achievements': new FormControl(playerAchievements),
      'active': new FormControl(playerActive),
      'sport': new FormControl(playerSport),
      'owner': new FormControl(owner)
    });
  }
}