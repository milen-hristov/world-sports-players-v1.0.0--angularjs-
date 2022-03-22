import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/players", pathMatch: "full" },
  {
    path: "players",
    loadChildren: () =>
      import("./players/players.module").then((m) => m.PlayersModule),
  },
  {
    path: "my-profile",
    loadChildren: () =>
      import("./my-profile/my-profile.module").then((m) => m.MyProfileModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
