import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// import { PlayersDetailsComponent } from "./players/players-details/players-details.component";
// import { PlayersListComponent } from "./players/players-list/players-list.component";
// import { PlayersComponent } from "./players/players.component";
// import { PlayersCreatePlayersComponent } from "./players/players-create-players/players-create-players.component";
import { AuthComponent } from "./auth/auth.component";
// import { AuthGuard } from "./auth/auth.guard";
// import { SportsComponent } from "./sports/sports.component";
// import { CreateComponent } from "./players/create/create.component";
// import { MyProfileComponent } from "./my-profile/my-profile.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/players", pathMatch: "full" },

  // { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
