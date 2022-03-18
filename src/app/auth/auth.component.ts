import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponseData } from './authResponseData.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = 'Error message!';

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      console.log('login');
    } else {
      authObs = this.authService.signup(email, password);
      console.log('register');
    }

    authObs.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/players']);
      },
      error: (errorRes) => {
        console.log(errorRes);
        this.error = errorRes.error.error.message;
        this.isLoading = false;
      }
    });

    form.reset();
  }

}
