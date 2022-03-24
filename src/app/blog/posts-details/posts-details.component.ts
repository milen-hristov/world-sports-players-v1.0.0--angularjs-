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
import { map, Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "src/app/auth/auth.service";
import { HandleError } from "src/app/shared/handleError.service";
import { PostsService } from "../blog.service";

import { Post } from "../post.model";
import { Comment } from "../comment.model";

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
          transform: "translatey(0)",
        })
      ),
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translatey(-100px)",
        }),
        animate(1000),
      ]),
      transition("* => void", [
        animate(
          1000,
          style({
            transform: "translatey(100px)",
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
  currentUserEmail: string;
  isLoading: boolean = false;
  isAuthenticated: boolean = false;
  message: string = null;
  commentForm: FormGroup;
  comments: Comment[] | undefined;
  isCommented: boolean = false;

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
            this.currentUserEmail = user.email;
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

    this.initForm();
    this.getAllComments();
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

  private initForm() {
    let info = "";
    let date = new Date();
    let postId = this.id;
    let ownerId = this.currentUserID;
    let ownerEmail = this.currentUserEmail;

    this.commentForm = new FormGroup({
      info: new FormControl(info, [Validators.required]),
      date: new FormControl(date),
      ownerId: new FormControl(ownerId),
      ownerEmail: new FormControl(ownerEmail),
      postId: new FormControl(postId),
    });
  }

  onCommentPost() {
    if (!this.commentForm.valid) {
      this.message = "Please fill in all the required (*) fields.";
      return;
    }

    this.postsService.addComment(this.commentForm.value).subscribe({
      next: () => {
        this.getAllComments();
      },
      error: (err) => {
        this.message = this.handleError.handleErrorPlayer(err);
        console.log(err);
      },
    });

    this.commentForm.reset();
  }

  getAllComments() {
    this.isLoading = true;
    this.comments = undefined;
    this.postsService
      .getComments()
      .pipe(
        map((responseData) => {
          const commentsArr: Comment[] = [];
          for (const key in responseData) {
            commentsArr.push({ ...responseData[key] });
          }
          return commentsArr;
        })
      )
      .subscribe({
        next: (commentsRes) => {
          let filtered = commentsRes.filter((post) => post.postId == this.id);

          if (filtered.length > 0) {
            this.isCommented = true;
          }
          this.comments = filtered;
          this.isLoading = false;
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  get info() {
    return this.commentForm.get("info");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
