import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

import { AuthResponseData } from './authResponseData.interface';

@Injectable({ providedIn: 'root' })

export class AuthService {

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
                    console.log(resData);
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
                    console.log(resData);
                })
            );
    }
}