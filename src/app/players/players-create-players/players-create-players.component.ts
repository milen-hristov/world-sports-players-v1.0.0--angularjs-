import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PlayersService } from '../players.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import countryListExport from '../../shared/countryList';
import { Sport } from 'src/app/sports/sport.model';
import { SportsService } from 'src/app/sports/sports.service';
import { map } from 'rxjs/operators';
import { HandleError } from 'src/app/shared/handleError.service';
import { FileUploadService } from 'src/app/shared/upload-image/file-upload.service';

@Component({
  selector: 'app-players-create-players',
  templateUrl: './players-create-players.component.html',
  styleUrls: ['./players-create-players.component.css'],
})
export class PlayersCreatePlayersComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  playerForm: FormGroup;
  currentUser: User;
  countryList: { name: string; code: string }[];
  sports: Sport[] | undefined;
  message: string = null;
  subscription: Subscription;
  imageUrl: string = 'default';

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router,
    private authService: AuthService,
    private sportsService: SportsService,
    private handleError: HandleError,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.countryList = countryListExport;

    this.fetchSports();

    this.subscription = this.fileUploadService.imagePathChanged.subscribe(
      (res) => {
        this.imageUrl = res;
        this.playerForm.patchValue({
          imagePath: this.imageUrl,
        });
      }
    );
  }

  onSubmit() {
    if (!this.playerForm.valid) {
      this.message = 'Please fill in all the required (*) fields.';
      return;
    }

    if (this.editMode) {
      this.playersService
        .updatePlayer(this.id, this.playerForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/players']);
          },
          error: (err) => {
            this.message = this.handleError.handleErrorPlayer(err);
            console.log(err);
          },
        });
    } else {
      this.playersService.addPlayer(this.playerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/players']);
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          console.log(err);
        },
      });
    }
    // this.router.navigate(['../'], {relativeTo: this.route});
  }

  fetchSports() {
    this.sports = undefined;
    this.sportsService
      .getSports()
      .pipe(
        map((responseData) => {
          const sportsArray: Sport[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              sportsArray.push({ ...responseData[key], id: key });
            }
          }
          let sortedSportsArray = sportsArray.sort((a,b) => a.name.localeCompare(b.name));
          return sortedSportsArray;
        })
      )
      .subscribe({
        next: (sports) => {
          this.sports = sports;
          // console.log(this.sports);
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          console.log(err);
        },
      });
  }

  private initForm() {
    let playerName = '';
    let playerCountry = '';
    let playerDesc = '';
    let playerImg = '';
    let playerDOB = '';
    let playerAchievements = '';
    let playerActive = '';
    let playerSport = '';
    let owner = this.currentUser.id;

    if (this.editMode) {
      this.playersService.getPlayer(this.id).subscribe((player) => {
        if (player.owner !== this.currentUser.id) {
          this.message =
            'You are not authorised to edit player created by different user.';
          this.router.navigate(['/players', this.id]);
        } else {
          this.playerForm.patchValue({
            name: player.name,
            country: player.country,
            description: player.description,
            imagePath: player.imagePath,
            dob: player.dob,
            achievements: player.achievements,
            active: player.active,
            sport: player.sport,
          });
        }
      });
    }

    this.playerForm = new FormGroup({
      name: new FormControl(playerName, [
        Validators.required,
        Validators.minLength(3),
      ]),
      country: new FormControl(playerCountry, Validators.required),
      description: new FormControl(playerDesc, Validators.required),
      imagePath: new FormControl(playerImg, [
        Validators.required,
        Validators.pattern(/^(http|https):/),
      ]),
      dob: new FormControl(playerDOB, Validators.required),
      achievements: new FormControl(playerAchievements),
      active: new FormControl(playerActive, Validators.required),
      sport: new FormControl(playerSport, Validators.required),
      owner: new FormControl(owner),
    });
  }

  get name() {
    return this.playerForm.get('name');
  }
  get sport() {
    return this.playerForm.get('sport');
  }
  get country() {
    return this.playerForm.get('country');
  }
  get description() {
    return this.playerForm.get('description');
  }
  get imagePath() {
    return this.playerForm.get('imagePath');
  }
  get dob() {
    return this.playerForm.get('dob');
  }
  get active() {
    return this.playerForm.get('active');
  }
}
