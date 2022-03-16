import { Component, Input, OnInit } from '@angular/core';

import { Player } from '../players-list/player.model';

@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.css']
})
export class PlayersDetailsComponent implements OnInit {

  @Input() players: Player[] = [
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
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
