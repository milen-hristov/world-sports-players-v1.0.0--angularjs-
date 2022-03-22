import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { RouterModule } from "@angular/router";

import { MyCreatedPlayersComponent } from "./my-created-players/my-created-players.component";
import { MyFavouritePlayersComponent } from "./my-favourite-players/my-favourite-players.component";
import { MyProfileComponent } from "./my-profile.component";
import { SharedModule } from "../shared.module";

@NgModule({
  declarations: [
    MyProfileComponent,
    MyCreatedPlayersComponent,
    MyFavouritePlayersComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "my-profile",
        component: MyProfileComponent,
        canActivate: [AuthGuard],
      },
    ]),
    SharedModule,
  ],
})
export class MyProfileModule {}
