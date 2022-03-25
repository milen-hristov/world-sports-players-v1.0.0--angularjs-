import { NgModule } from "@angular/core";
import { AuthGuard } from "../auth/auth.guard";
import { RouterModule } from "@angular/router";

import { MyProfileComponent } from "./my-profile.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    MyProfileComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: MyProfileComponent,
        canActivate: [AuthGuard],
      },
    ]),
    SharedModule,
  ],
})
export class MyProfileModule {}
