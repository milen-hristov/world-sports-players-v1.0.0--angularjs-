import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";
import { AuthResponseData } from "./authResponseData.interface";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  message: string = null;
  isSamePassword = true;
  user = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit() {
    console.log(this.isSamePassword);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.user.email = form.value.email;
    this.user.password = form.value.password;
    this.user.repeatPassword = form.value.repeatPassword;

    if (!this.isLoginMode) {
      if (this.user.password != this.user.repeatPassword) {
        this.isSamePassword = false;
        this.message = 'Passwords do not match.'
        return;
      }
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(this.user.email, this.user.password);
      console.log("login");
    } else {
      authObs = this.authService.signup(this.user.email, this.user.password);
      console.log("register");
    }

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(["/players"]);
      },
      error: (errorRes) => {
        this.message = this.authService.handleError(errorRes);
        console.log(errorRes);
        // this.message = errorRes.error.error.message;
        this.isLoading = false;
      },
    });

    form.reset();

  }

  onHandleMessage() {
    this.message = null;
  }
}
