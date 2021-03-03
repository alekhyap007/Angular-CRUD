import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { PostsResourceComponent } from '../posts-resource/posts-resource.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent,
    children: [
      { path: '', component: PostsResourceComponent, pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
