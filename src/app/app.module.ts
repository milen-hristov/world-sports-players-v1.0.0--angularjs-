import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlayersComponent } from './players/players.component';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { PlayersService } from './players/players.service';
import { PlayersCreateComponent } from './players/players-create/players-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayersComponent,
    PlayersListComponent,
    PlayersDetailsComponent,
    PlayersCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
