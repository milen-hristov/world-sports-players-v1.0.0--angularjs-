import * as fromMyProfile from '../my-profile/store/myProfile.reducer';

export interface AppState {
  myProfilePlayers: fromMyProfile.State;
}