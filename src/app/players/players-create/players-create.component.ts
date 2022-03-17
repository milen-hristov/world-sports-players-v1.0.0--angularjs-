import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-players-create',
  templateUrl: './players-create.component.html',
  styleUrls: ['./players-create.component.css']
})
export class PlayersCreateComponent implements OnInit {

  playerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    let playerName = '';
    let playerCountry = '';
    let playerDesc = '';
    let playerImg = '';
    let playerDOB = '';
    let playerAchievements = '';
    let playerActive = '';
    let playerSport = '';

    this.playerForm = new FormGroup({
      'name': new FormControl(playerName),
      'country': new FormControl(playerCountry),
      'description': new FormControl(playerDesc),
      'imagePath': new FormControl(playerImg),
      'dob': new FormControl(playerDOB),
      'achievements': new FormControl(playerAchievements),
      'status': new FormControl(playerActive),
      'sport': new FormControl(playerSport),
    });
  }

  onSubmit() {
    console.log(this.playerForm)
  }
}
