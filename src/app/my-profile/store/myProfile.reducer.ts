import { Action, createReducer, on } from '@ngrx/store';

import { Player } from 'src/app/players/player.model';
import { PlayerFav } from 'src/app/players/playerFav.model';
import * as PlayerActions from './myProfile.actions';

export interface State {
  players: Player[];
  favPlayers: PlayerFav[];
}

const initialState: State = {
  players: [],
  favPlayers: [],
};

const _playerReducer = createReducer(
  initialState,
  on(PlayerActions.setPlayers, (state, action) => ({
    ...state,
    players: [...action.players],
  })),
  on(PlayerActions.setFavPlayers, (state, action) => ({
    ...state,
    favPlayers: [...action.favPlayers],
  }))
);

export function playerReducer(state: State, action: Action) {
  return _playerReducer(state, action);
}