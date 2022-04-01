import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule } from '@angular/router';

import { MyProfileComponent } from './my-profile.component';
import { SharedModule } from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import * as fromMyProfile from './store/myProfile.reducer';

@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MyProfileComponent,
        canActivate: [AuthGuard],
      },
    ]),
    SharedModule,
    StoreModule.forFeature('myProfilePlayers', fromMyProfile.playerReducer),
  ],
})
export class MyProfileModule {}
