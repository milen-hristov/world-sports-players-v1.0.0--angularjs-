import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { PlayersComponent } from './players/players.component';
import { PlayersCreateComponent } from './players/players-create/players-create.component';

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
      { path: 'create', component: PlayersCreateComponent },
      { path: ':id', component: PlayersDetailsComponent },
      { path: ':id/edit', component: PlayersCreateComponent },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
