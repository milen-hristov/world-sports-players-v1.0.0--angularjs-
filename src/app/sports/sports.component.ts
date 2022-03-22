import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { Sport } from "./sport.model";
import { SportsService } from "./sports.service";

@Component({
  selector: "app-sports",
  templateUrl: "./sports.component.html",
  styleUrls: ["./sports.component.css"],
})
export class SportsComponent implements OnInit {
  isLoading = false;
  sportForm: FormGroup;
  currentUser: User;
  sports: Sport[] | undefined;
  error: string = null;

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
    if (!this.sportForm.valid) {
      this.error = "Please fill in all the required (*) fields.";
      return;
    }

    this.sportsService.addSport(this.sportForm.value).subscribe({
      next: () => {
        this.fetchSports();
        this.router.navigate(["/players/create/sport"]);
        this.error = null;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.sportForm.reset();
  }

  private initForm() {
    let sportsName = "";
    let confirmationLink = "";
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
          const postsArray: Sport[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((sports) => {
        this.sports = sports;
        console.log(this.sports);
        this.isLoading = false;
      });
  }

  get name() {
    return this.sportForm.get("name");
  }
}
