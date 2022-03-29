import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/user.model";
import { HandleError } from "src/app/shared/handleError.service";
import { FileUploadService } from "src/app/shared/upload-image/file-upload.service";
import { PostsService } from "../blog.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  postsForm: FormGroup;
  currentUser: User;
  message: string = null;
  subscription: Subscription;
  imageUrl: string = "default";

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
    private authService: AuthService,
    private handleError: HandleError,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });

    this.subscription = this.fileUploadService.imagePathChanged.subscribe((res) => {
      this.imageUrl = res;
      this.postsForm.patchValue({
        imagePath: this.imageUrl,
      });
    });
  }

  onSubmit() {
    if (!this.postsForm.valid) {
      this.message = "Please fill in all the required (*) fields.";
      return;
    }
    if (this.editMode) {
      this.postsService.updatePost(this.id, this.postsForm.value).subscribe({
        next: () => {
          this.router.navigate(["/blog/posts"]);
          this.postsService.postModified.next(true);
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          console.log(err);
        },
      });
    } else {
      this.postsService.addPost(this.postsForm.value).subscribe({
        next: () => {
          this.router.navigate(["/blog/posts"]);
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          console.log(err);
        },
      });
    }
  }

  private initForm() {
    let title = "";
    let info = "";
    let imagePath = "";
    let date = new Date();
    let ownerId = this.currentUser.id;
    let ownerEmail = this.currentUser.email;

    if (this.editMode) {
      this.postsService.getPost(this.id).subscribe((post) => {
        if (post.ownerId !== this.currentUser.id) {
          this.message =
            "You are not authorised to edit player created by different user.";
          this.router.navigate(["/blog/posts", this.id]);
        } else {
          this.postsForm.patchValue({
            name: post.name,
            info: post.info,
            imagePath: post.imagePath,
          });
        }
      });
    }
    this.postsForm = new FormGroup({
      name: new FormControl(title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      info: new FormControl(info, [
        Validators.required,
        Validators.maxLength(1500),
      ]),
      imagePath: new FormControl(imagePath, [
        Validators.required,
        Validators.pattern(/^(http|https):/),
      ]),
      date: new FormControl(date),
      ownerId: new FormControl(ownerId),
      ownerEmail: new FormControl(ownerEmail),
    });
  }

  get name() {
    return this.postsForm.get("name");
  }
  get info() {
    return this.postsForm.get("info");
  }
  get imagePath() {
    return this.postsForm.get("imagePath");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
