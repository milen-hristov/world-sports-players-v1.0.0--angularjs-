import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Player } from "./player.model";

@Injectable()

export class PlayersService {

    constructor(private http: HttpClient) { }

    getPlayers() {
        return this.http.get<Player[]>('https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players.json');
    }

    getPlayer(id: string) {
        return this.http.get<Player>(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players/${id}.json`);
    }

    addPlayer(player: Player) {
        return this.http.post<Player>(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players.json`, player);
    }

    updatePlayer(id: string, updatedPlayer: Player) {
        return this.http.put<Player>(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players/${id}.json`, updatedPlayer);
    }

    deletePlayer(id: string) {
        return this.http.delete(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players/${id}.json`);
    }
}