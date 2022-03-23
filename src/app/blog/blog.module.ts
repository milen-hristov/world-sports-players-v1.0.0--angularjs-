import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared.module";
import { BlogComponent } from "./blog.component";
import { AuthGuard } from "../auth/auth.guard";
import { PostsComponent } from "./posts/posts.component";
import { CreatePostComponent } from "./create-post/create-post.component";
import { PostsDetailsComponent } from "./posts-details/posts-details.component";

@NgModule({
  declarations: [
    BlogComponent,
    PostsComponent,
    CreatePostComponent,
    PostsDetailsComponent,
  ],
  imports: [
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: BlogComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: "posts",
            component: PostsComponent,
            children: [
              { path: ":id", component: PostsDetailsComponent },
              { path: ":id/edit", component: CreatePostComponent },
            ],
          },
          { path: "create", component: CreatePostComponent },
        ],
      },
    ]),
  ],
})
export class BlogModule {}
