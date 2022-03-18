import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubcription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSubcription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      // console.log(!user);  // not logged in
      // console.log(!!user); // logged in
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe;
  }

}
