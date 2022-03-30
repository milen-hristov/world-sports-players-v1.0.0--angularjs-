import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { SportsComponent } from '../sports/sports.component';
import { CreateComponent } from './create/create.component';
import { PlayersCreatePlayersComponent } from './players-create-players/players-create-players.component';
import { PlayersDetailsComponent } from './players-details/players-details.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';

@NgModule({
  declarations: [
    PlayersComponent,
    PlayersListComponent,
    PlayersDetailsComponent,
    PlayersCreatePlayersComponent,
    CreateComponent,
    SportsComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PlayersRoutingModule,
    SharedModule,
  ],
})
export class PlayersModule {}
