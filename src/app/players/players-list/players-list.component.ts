import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { PlayersService } from '../players.service';
import { Player } from '../player.model';
import { HandleError } from 'src/app/shared/handleError.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        query(':enter', [
          style({
            opacity: '0',
          }),
          stagger(30, [animate('300ms ease-in', style({ opacity: 1 }))]),
        ]),
      ]),
      transition('* => void', animate('300ms ease-out', style({ opacity: 0 }))),
    ]),
  ],
})
export class PlayersListComponent implements OnInit, OnDestroy {
  players: Player[] | undefined;
  playersBackup: Player[] | undefined;
  isLoading = false;
  message: string = null;
  searchForm: FormGroup;
  subscription: Subscription;
  showLessIntro: boolean = true;

  constructor(
    private playersService: PlayersService,
    private handleError: HandleError,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.message = this.router.getCurrentNavigation().extras.state['message'];
    }
  }

  ngOnInit() {
    this.fetchPlayers();
    this.initForm();

    this.subscription = this.searchForm.valueChanges.subscribe((searchObj) => {
      this.players = this.playersBackup;
      let search = searchObj.searchedText.trim();

      let filterPlayers = this.players.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.sport.toLowerCase().includes(search.toLowerCase()) ||
          x.country.toLowerCase().includes(search.toLowerCase())
      );
      this.players = filterPlayers;
      this.message = `Results found: ${this.players.length}`;
    });
  }

  private initForm() {
    let searchedText = '';

    this.searchForm = new FormGroup({
      searchedText: new FormControl(searchedText),
    });
  }

  fetchPlayers() {
    this.isLoading = true;
    this.players = undefined;
    this.playersService
      .getPlayers()
      .pipe(
        map((responseData) => {
          const playersArray: Player[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              playersArray.push({ ...responseData[key], id: key });
            }
          }
          return playersArray;
        })
      )
      .subscribe({
        next: (players) => {
          this.players = players;
          this.playersBackup = players;
          this.isLoading = false;
          // console.log(this.players);
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          this.isLoading = false;
          console.log(err);
        },
      });
  }

  onShowLess() {
    this.showLessIntro = !this.showLessIntro;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
