import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Sport } from './sport.model';
import { SportsService } from './sports.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
})
export class SportsComponent implements OnInit {
  sportForm: FormGroup;
  currentUser: User;
  sports: Sport[] | undefined;

  constructor(
    private sportsService: SportsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });

    this.initForm();

    this.fetchSports();
  }

  onSubmit() {
    this.sportsService.addSport(this.sportForm.value).subscribe({
      next: () => {
        this.fetchSports();
        this.router.navigate(['/players/create/sport']);
      },
      error: (err) => {
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
      name: new FormControl(sportsName),
      confirmationLink: new FormControl(confirmationLink),
      owner: new FormControl(owner),
    });
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
}
