import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlayersComponent } from './players/players.component';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { PlayersService } from './players/players.service';
import { PlayersCreatePlayersComponent } from './players/players-create-players/players-create-players.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { SubstringPipe } from './shared/substring.pipe';
import { SportsComponent } from './sports/sports.component';
import { CreateComponent } from './players/create/create.component';
import { SportsService } from './sports/sports.service';
import { MyProfileComponent } from './my-profile/my-profile.component';

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
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [PlayersService, SportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
