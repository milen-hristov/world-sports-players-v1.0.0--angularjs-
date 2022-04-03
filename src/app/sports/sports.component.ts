import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { HandleError } from '../shared/handleError.service';
import { Sport } from './sport.model';
import { SportsService } from './sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
})
export class SportsComponent implements OnInit {
  isLoading: boolean = false;
  sportForm: FormGroup;
  currentUser: User;
  sports: Sport[] | undefined;
  message: string = null;

  constructor(
    private sportsService: SportsService,
    private router: Router,
    private authService: AuthService,
    private handleError: HandleError
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });

    this.initForm();

    this.fetchSports();
  }

  onSubmit() {
    if (!this.sportForm.valid) {
      this.message = 'Please fill in all the required (*) fields.';
      return;
    }

    this.sportsService.addSport(this.sportForm.value).subscribe({
      next: () => {
        this.fetchSports();
        this.message = 'Sport created successfully';
        this.router.navigate(['/players/create/sport']);
      },
      error: (err) => {
        this.message = this.handleError.handleErrorPlayer(err);
        console.log(err);
      },
    });

    this.sportForm.reset();
  }

  private initForm() {
    let sportsName = '';
    let confirmationLink = '';
    let owner = this.currentUser.id;

    this.sportForm = new FormGroup({
      name: new FormControl(sportsName, Validators.required),
      confirmationLink: new FormControl(confirmationLink),
      owner: new FormControl(owner),
    });
  }

  fetchSports() {
    this.isLoading = true;
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
          let sortedSportsArray = sportsArray.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          return sortedSportsArray;
        })
      )
      .subscribe({
        next: (sports) => {
          this.sports = sports;
          // console.log(this.sports);
          this.isLoading = false;
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  get name() {
    return this.sportForm.get('name');
  }
}
