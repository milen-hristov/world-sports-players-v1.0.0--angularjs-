import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { PlayersService } from '../players.service';

@Component({
  selector: 'app-players-create',
  templateUrl: './players-create.component.html',
  styleUrls: ['./players-create.component.css']
})
export class PlayersCreateComponent implements OnInit {
  id: number;
  editMode = false;
  playerForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private playersService: PlayersService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = Number(params['id']);
        // this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    console.log(this.playerForm);
    this.playersService.addPlayer(this.playerForm.value);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
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
}