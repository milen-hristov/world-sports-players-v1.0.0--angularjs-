import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{ path: "auth", component: AuthComponent }]),
    FormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
