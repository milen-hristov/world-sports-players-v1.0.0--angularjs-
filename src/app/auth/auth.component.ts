import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponseData } from './authResponseData.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;

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

    console.log(form.value)
    // this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      console.log('login');
    } else {
      authObs = this.authService.signup(email, password);
      console.log('register');
    }

    authObs.subscribe(() => this.router.navigate(['/players']));

    form.reset();
  }

}
