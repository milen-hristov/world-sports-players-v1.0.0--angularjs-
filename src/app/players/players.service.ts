import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/internal/Subject";

import { Player } from "./player.model";

@Injectable()

export class PlayersService {
    selectedPlayer = new EventEmitter<Player>();
    playersChanged = new Subject<Player[]>();

    constructor(private http: HttpClient) { }

    // private players: Player[] = [
    //     new Player('Ivet Lalova',
    //         'A Bulgarian athlete who specialises in the 100 metres and 200 metres sprint events',
    //         '/assets/images/ivet.jpg',
    //         'Bulgaria', '18 May 1984', 'European Championships - 1 Golden Medal, 2 Silver Medals',
    //         true, 'Athletics'),
    //     new Player('Lionel Andres Messi',
    //         'An Argentine professional footballer',
    //         '/assets/images/messi.jpg',
    //         'Argentina', '24 June 1987', 'Ballon dOr/FIFA Ballon dOr: 2009, 2010, 2011, 2012, 2015, 2019, 2021',
    //         true, 'Football'),
    //     new Player('Max Verstappen',
    //         'A Belgian-Dutch racing driver - Formula 1',
    //         '/assets/images/max.jpg',
    //         'Netherlands', '30 September 1997', '2021 Formula One World Champion',
    //         true, 'Formula 1'),
    //     new Player('Novak Djokovic',
    //         'A Serbian professional tennis player',
    //         '/assets/images/novak.jpg',
    //         'Serbia', '	22 May 1987', '20 Grand Slam titles',
    //         true, 'Tennis'),
    // ];

    // private players: Player[];

    getPlayers() {
        // return this.players.slice();

        return this.http.get<Player[]>('https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players.json');
    }

    // getPlayer(index: number) {
    //     return this.players[index];
    // }

    getPlayer(id: string) {
        // return this.players[index];
        return this.http.get<Player>(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players/${id}.json`);
    }

    addPlayer(player: Player) {
        // this.players.push(player);
        // this.playersChanged.next(this.players.slice());

        return this.http.post<Player>(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players.json`, player);
    }

    // updatePlayer(index: number, updatedPlayer: Player) {
    //     this.players[index] = updatedPlayer;
    //     this.playersChanged.next(this.players.slice());
    // }

    updatePlayer(id: string, updatedPlayer: Player) {
        return this.http.put<Player>(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players/${id}.json`, updatedPlayer);
    }


    // deletePlayer(index: number) {
    //     this.players.splice(index, 1);
    //     this.playersChanged.next(this.players.slice());
    // }

    deletePlayer(id: string) {

        return this.http.delete(`https://world-sports-players-default-rtdb.europe-west1.firebasedatabase.app/players/${id}.json`);
    }
}