import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { HandleError } from 'src/app/shared/handleError.service';
import { PostsService } from '../blog.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
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
export class PostsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isModified = false;
  posts: Post[] | undefined;
  isLoading = false;
  message: string = null;

  constructor(
    private postsService: PostsService,
    private handleError: HandleError,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.message = this.router.getCurrentNavigation().extras.state['message'];
    }
  }

  ngOnInit() {
    this.fetchPosts();

    this.subscription = this.postsService.postModified.subscribe((res) => {
      this.isModified = res;
      this.fetchPosts();
    });
  }

  onClickPost(id) {
    this.postsService.postChanged.next(id);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
