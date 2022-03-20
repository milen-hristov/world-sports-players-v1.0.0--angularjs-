import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

import { Player } from "../player.model";
import { PlayerLike } from "../playerLike.model";
import { PlayersService } from "../players.service";

@Component({
  selector: "app-players-details",
  templateUrl: "./players-details.component.html",
  styleUrls: ["./players-details.component.css"],
})
export class PlayersDetailsComponent implements OnInit {
  player: Player = {
    id: "",
    name: "",
    description: "",
    imagePath: "",
    country: "",
    dob: "",
    achievements: "",
    active: "",
    sport: "",
    owner: "",
  };
  playerLikes: PlayerLike[] | undefined;

  id: string;

  isOwner: boolean;
  ownerID: string;
  currentUserID: string;
  isLoading = false;
  isLiked = false;

  constructor(
    private playersService: PlayersService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
    console.log('Params');
    

    this.playersService.getPlayer(this.id).subscribe((player) => {
      this.player = player;
      this.ownerID = player.owner;
      
      this.authService.user.subscribe((user) => {
        this.currentUserID = user.id;
      });
      
      if (this.ownerID === this.currentUserID) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }

    });
    console.log('get player');
    this.getAllLikes();
    
 
    console.log('get all likes');
  }

  onEditPlayer() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(["../", this.id, "edit"], { relativeTo: this.route });
  }

  onDeletePlayer() {
    this.playersService.deletePlayer(this.id).subscribe({
      next: () => {
        this.router.navigate(["/players"]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllLikes() {
    this.isLoading = true;
    this.playerLikes = undefined;
    this.playersService
      .getPlayerLikes()
      .pipe(
        map((responseData) => {
          const playerLikesArr: PlayerLike[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              playerLikesArr.push({ ...responseData[key] });
              if (responseData[key].owner == this.currentUserID) {
                this.isLiked = true;
              }
            }
          }
          return playerLikesArr;
        }),
        map((playerLikesArr) =>
          playerLikesArr.filter((player) => player.id == this.id)
        )
      )
      .subscribe((playerLikesRes) => {
        this.playerLikes = playerLikesRes;
        this.isLoading = false;
      });
  }

  onLikePlayer() {
    let likeObj:PlayerLike = {
      id: this.id,
      owner: this.currentUserID,
    };

    this.playersService.likePlayer(likeObj).subscribe({
      next: () => {
        this.getAllLikes();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
