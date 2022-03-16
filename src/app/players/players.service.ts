import { Player } from "./player.model";

export class PlayersService {

    private players: Player[] = [
        new Player('Ivet Lalova',
            'A Bulgarian athlete who specialises in the 100 metres and 200 metres sprint events',
            'https://upload.wikimedia.org/wikipedia/commons/3/3c/Ivet_Lalova_by_Augustas_Didzgalvis.jpg',
            'Bulgaria', '18 May 1984', 'European Championships - 1 Golden Medal, 2 Silver Medals',
            true, 'Athletics'),
        new Player('Lionel Andres Messi',
            'An Argentine professional footballer',
            'https://phantom-marca.unidadeditorial.es/14cc0543ea4d71a07d7d254da3b547df/resize/660/f/webp/assets/multimedia/imagenes/2022/02/26/16458934615953.jpg',
            'Argentina', '24 June 1987', 'Ballon dOr/FIFA Ballon dOr: 2009, 2010, 2011, 2012, 2015, 2019, 2021',
            true, 'Football'),
        new Player('Max Verstappen',
            'A Belgian-Dutch racing driver - Formula 1',
            'https://cdn-7.motorsport.com/images/mgl/24vA3r46/s8/max-verstappen-red-bull-racing-1.jpg',
            'Netherlands', '30 September 1997', '2021 Formula One World Champion',
            true, 'Formula 1'),
        new Player('Novak Djokovic',
            'A Serbian professional tennis player',
            'https://static.dw.com/image/60366554_303.jpg',
            'Serbia', '	22 May 1987', '20 Grand Slam titles',
            true, 'Tennis'),
    ];

    getPlayers() {
        return this.players.slice();
    }

    getPlayer(index: number) {
        return this.players[index];
    }
}