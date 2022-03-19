import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { PlayersComponent } from './players/players.component';
import { PlayersCreatePlayersComponent } from './players/players-create-players/players-create-players.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { SportsComponent } from './sports/sports.component';
import { CreateComponent } from './players/create/create.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/players', pathMatch: 'full' },
//   {
//     path: 'players', component: PlayersComponent, children: [
//       { path: ':id', component: PlayersDetailsComponent },
//     ]
//   },
// ];

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  {
    path: 'players', component: PlayersComponent, children: [
      { path: '', component: PlayersListComponent },
      { path: 'create', component: CreateComponent, canActivate: [AuthGuard], children: [
        {path: 'player', component: PlayersCreatePlayersComponent},
        {path: 'sport', component: SportsComponent}
      ] },
      { path: ':id', component: PlayersDetailsComponent },
      { path: ':id/edit', component: PlayersCreatePlayersComponent },
    ]
  },
  { path: 'auth', component: AuthComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
