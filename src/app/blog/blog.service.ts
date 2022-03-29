import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Post } from "./post.model";
import { Comment } from "./comment.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class PostsService {
  constructor(private http: HttpClient) {}

  postChanged = new Subject<string>();
  postModified= new Subject<boolean>();
  imagePathChanged = new Subject<string>();

  getPosts() {
    return this.http.get<Post[]>(`${environment.databaseURL}/posts.json`);
  }

  getPost(id: string) {
    return this.http.get<Post>(`${environment.databaseURL}/posts/${id}.json`);
  }

  addPost(post: Post) {
    return this.http.post<Post>(`${environment.databaseURL}/posts.json`, post);
  }

  updatePost(id: string, updatedPost: Post) {
    return this.http.put<Post>(
      `${environment.databaseURL}/posts/${id}.json`,
      updatedPost
    );
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.databaseURL}/posts/${id}.json`);
  }

  addComment(comment: Comment) {
    return this.http.post<Comment>(`${environment.databaseURL}/comments.json`, comment);
  }

  getComments() {
    return this.http.get<Comment[]>(`${environment.databaseURL}/comments.json`);
  }
}
