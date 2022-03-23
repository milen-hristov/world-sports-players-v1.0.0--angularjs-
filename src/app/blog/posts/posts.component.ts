import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";

import { HandleError } from "src/app/shared/handleError.service";
import { PostsService } from "../blog.service";
import { Post } from "../post.model";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent implements OnInit {
  posts: Post[] | undefined;
  isLoading = false;
  message: string = null;
  // isHidden: boolean = false;

  constructor(
    private postsService: PostsService,
    private handleError: HandleError
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.isLoading = true;
    this.posts = undefined;
    this.postsService
      .getPosts()
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.isLoading = false;
          // console.log(this.posts);
        },
        error: (err) => {
          this.message = this.handleError.handleErrorPlayer(err);
          this.isLoading = false;
          console.log(err);
        },
      });
  }
}
