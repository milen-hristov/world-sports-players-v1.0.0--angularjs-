import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { PlayersComponent } from "./players/players.component";
import { PlayersListComponent } from "./players/players-list/players-list.component";
import { PlayersDetailsComponent } from "./players/players-details/players-details.component";
import { PlayersService } from "./players/players.service";
import { PlayersCreatePlayersComponent } from "./players/players-create-players/players-create-players.component";
import { AuthComponent } from "./auth/auth.component";
import { LoadingComponent } from "./shared/loading/loading.component";
import { SubstringPipe } from "./shared/substring.pipe";
import { SportsComponent } from "./sports/sports.component";
import { CreateComponent } from "./players/create/create.component";
import { SportsService } from "./sports/sports.service";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { MyCreatedPlayersComponent } from "./my-profile/my-created-players/my-created-players.component";
import { MyFavouritePlayersComponent } from "./my-profile/my-favourite-players/my-favourite-players.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FooterComponent } from "./footer/footer.component";
import { PopupComponent } from "./shared/popup/popup.component";
import { HandleError } from "./shared/handleError.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayersComponent,
    PlayersListComponent,
    PlayersDetailsComponent,
    PlayersCreatePlayersComponent,
    AuthComponent,
    LoadingComponent,
    SubstringPipe,
    SportsComponent,
    CreateComponent,
    MyProfileComponent,
    MyCreatedPlayersComponent,
    MyFavouritePlayersComponent,
    NotFoundComponent,
    FooterComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    PlayersService,
    SportsService,
    HandleError,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
