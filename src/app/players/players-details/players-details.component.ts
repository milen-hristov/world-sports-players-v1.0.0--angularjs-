import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

import { Player } from "../player.model";
import { PlayerFav } from "../playerFav.model";
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
  isAuthenticated = false;
  isLiked: boolean | undefined;

  isFavourite: boolean | undefined;
  favouriteList: PlayerLike[] | undefined;
  isFavID: string;

  constructor(
    private playersService: PlayersService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.authService.user.subscribe((user) => {
        this.currentUserID = user.id;
        this.isAuthenticated = !!user;

        this.getAllFavourites();
      });
    });

    this.playersService.getPlayer(this.id).subscribe((player) => {
      this.player = player;
      this.ownerID = player.owner;
      if (this.ownerID === this.currentUserID) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
    });

    this.getAllLikes();
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
            playerLikesArr.push({ ...responseData[key] });
          }
          return playerLikesArr;
        }),
        map((playerLikesArr) =>
          playerLikesArr.filter((player) => player.id == this.id)
        )
      )
      .subscribe((playerLikesRes) => {
        let result = playerLikesRes.filter(
          (like) => like.owner === this.currentUserID
        );
        if (result.length > 0) {
          this.isLiked = true;
        }
        this.playerLikes = playerLikesRes;
        this.isLoading = false;
      });
  }

  onLikePlayer() {
    let likeObj: PlayerLike = {
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

  onFavPlayer() {
    if (this.isFavourite == false) {
      console.log("Add player to favourites");

      let favObj: PlayerFav = {
        id: this.id,
        owner: this.currentUserID,
        isFavID: "",
      };

      this.playersService.addFavPlayer(favObj).subscribe({
        next: () => {
          this.getAllFavourites();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log("Remove player from favourites");
      this.playersService.removeFavPlayer(this.isFavID).subscribe({
        next: () => {
          this.getAllFavourites();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getAllFavourites() {
    this.isLoading = true;
    this.favouriteList = undefined;
    this.playersService
      .getFavouriteList()
      .pipe(
        map((responseData) => {
          const favouriteListArr: PlayerFav[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              favouriteListArr.push({ ...responseData[key], isFavID: key });
            }
          }
          return favouriteListArr;
        }),
        map((favouriteListArr) =>
          favouriteListArr.filter((player) => player.id == this.id)
        )
      )
      .subscribe((favouriteListRes) => {
        let result = favouriteListRes.filter(
          (fav) => fav.owner === this.currentUserID
        );

        if (result.length > 0) {
          this.isFavID = result[0].isFavID;
          this.isFavourite = true;
        } else {
          this.isFavourite = false;
        }
        this.favouriteList = favouriteListRes;
        this.isLoading = false;
      });
  }
}
