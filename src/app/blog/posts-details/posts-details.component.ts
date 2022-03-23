import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from "@angular/animations";
import { Subscription } from "rxjs";

import { AuthService } from "src/app/auth/auth.service";
import { HandleError } from "src/app/shared/handleError.service";
import { PostsService } from "../blog.service";

import { Post } from "../post.model";

@Component({
  selector: "app-posts-details",
  templateUrl: "./posts-details.component.html",
  styleUrls: ["./posts-details.component.css"],
  animations: [
    trigger("postIntro", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
        animate(300),
      ]),
      transition("* => void", [
        animate(
          300,
          style({
            transform: "translateX(100px)",
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class PostsDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  post: Post = {
    id: "",
    name: "",
    info: "",
    imagePath: "",
    date: null,
    ownerId: "",
    ownerEmail: "",
  };

  id: string;
  isOwner: boolean;
  ownerID: string;
  currentUserID: string;
  isLoading: boolean = false;
  isAuthenticated: boolean = false;
  message: string = null;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private handleError: HandleError
  ) {}

  ngOnInit() {
    this.subscription = this.postsService.postChanged.subscribe((res) => {
      this.id = res;

      this.isLoading = true;
      this.postsService.getPost(this.id).subscribe({
        next: (post: Post) => {
          this.post = post;
          this.ownerID = post.ownerId;
          if (this.ownerID === this.currentUserID) {
            this.isOwner = true;
          } else {
            this.isOwner = false;
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.message = this.handleError.handleErrorPlayer(err);
          this.isLoading = false;
          console.log(err);
        },
      });
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.authService.user.subscribe({
        next: (user) => {
          if (user) {
            this.currentUserID = user.id;
            this.isAuthenticated = !!user;
          }
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          console.log(err);
        },
      });
    });

    this.isLoading = true;
    this.postsService.getPost(this.id).subscribe({
      next: (post: Post) => {
        this.post = post;
        this.ownerID = post.ownerId;
        if (this.ownerID === this.currentUserID) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.message = this.handleError.handleErrorPlayer(err);
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  onEditPost() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.router.navigate(["../", this.id, "edit"], { relativeTo: this.route });
  }

  onDeletePost() {
    this.isLoading = true;
    this.postsService.deletePost(this.id).subscribe({
      next: () => {
        this.router.navigate(["/blog/posts"]);
        this.postsService.postModified.next(true);
        this.isLoading = false;
      },
      error: (err) => {
        this.message = this.handleError.handleErrorPlayer(err);
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  onHidePost() {
    this.postsService.postModified.next(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
