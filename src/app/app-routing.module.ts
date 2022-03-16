import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { PlayersListComponent } from './players/players-list/players-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  {
    path: 'players', component: PlayersListComponent, children: [
      { path: ':id', component: PlayersDetailsComponent },
    ]
  },
  { path: 'player-details', component: PlayersDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
