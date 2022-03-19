import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { PlayersService } from '../players.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import countryListExport from '../../shared/countryList';
import { Sport } from 'src/app/sports/sport.model';
import { SportsService } from 'src/app/sports/sports.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-players-create-players',
  templateUrl: './players-create-players.component.html',
  styleUrls: ['./players-create-players.component.css']
})
export class PlayersCreatePlayersComponent implements OnInit {
  id: string;
  editMode = false;
  playerForm: FormGroup;
  currentUser: User;
  countryList: { name: string; code: string }[];
  sports: Sport[] | undefined;

  constructor(private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router,
    private authService: AuthService,
    private sportsService: SportsService) {
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

      this.fetchSports();
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

  fetchSports() {
    this.sports = undefined;
    this.sportsService.getSports()
      .pipe(
        map(responseData => {
          const postsArray: Sport[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
      )
      .subscribe(sports => {
        this.sports = sports;
        console.log(this.sports);
      });
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