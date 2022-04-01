import { createAction, props } from '@ngrx/store';

import { Player } from '../../players/player.model';
import { PlayerFav } from 'src/app/players/playerFav.model';

export const setPlayers = createAction(
  '[Player] Set Players',
  props<{
    players: Player[];
  }>()
);

export const fetchPlayers = createAction('[Player] Fetch Players');

export const setFavPlayers = createAction(
  '[Player] Set Favourite Players',
  props<{
    favPlayers: PlayerFav[];
  }>()
);

export const fetchFavPlayers = createAction('[Player] Fetch Favourite Players');
