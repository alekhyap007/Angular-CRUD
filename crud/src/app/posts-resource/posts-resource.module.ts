
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { PostsDashboardComponent } from './posts-dashboard/posts-dashboard.component';
import { PostsRoutingModule } from './posts-resource-routing.module';
import { PostsResourceComponent } from './posts-resource.component';
import { HeaderComponent } from '../header/header.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [CreatePostsComponent, PostsDashboardComponent, PostsResourceComponent, HeaderComponent],
    imports: [
      CommonModule, FormsModule, ReactiveFormsModule, PostsRoutingModule,
      MatGridListModule, MatTableModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule],
    exports: [ ],
  })
export class PostsResourceModule { }
