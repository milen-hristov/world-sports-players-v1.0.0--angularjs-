import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { SportsComponent } from "../sports/sports.component";
import { CreateComponent } from "./create/create.component";
import { PlayersCreatePlayersComponent } from "./players-create-players/players-create-players.component";
import { PlayersDetailsComponent } from "./players-details/players-details.component";
import { PlayersListComponent } from "./players-list/players-list.component";
import { PlayersComponent } from "./players.component";

const routes: Routes = [
  {
    path: "players",
    component: PlayersComponent,
    children: [
      { path: "", component: PlayersListComponent },
      {
        path: "create",
        component: CreateComponent,
        canActivate: [AuthGuard],
        children: [
          { path: "player", component: PlayersCreatePlayersComponent },
          { path: "sport", component: SportsComponent },
        ],
      },
      { path: ":id", component: PlayersDetailsComponent },
      { path: ":id/edit", component: PlayersCreatePlayersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule {}
