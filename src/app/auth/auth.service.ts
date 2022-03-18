import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import { AuthResponseData } from './authResponseData.interface';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })

export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    signup(email: string, password: string) {

        return this.http
            .post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAC_KYuN2griSvbgLJ78CUjOoQjoP_C1iw',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        Number(resData.expiresIn)
                    );
                })
            );

    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAC_KYuN2griSvbgLJ78CUjOoQjoP_C1iw',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(
                tap(resData => {
                  this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    Number(resData.expiresIn)
                  );
                })
            );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
      }
}