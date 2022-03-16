import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { PlayersComponent } from './players/players.component';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  {
    path: 'players', component: PlayersComponent, children: [
      { path: ':id', component: PlayersDetailsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
