import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'posts', pathMatch: 'full'
  },
  { path: 'posts', loadChildren: () => import('./posts-resource/posts-resource.module').then(m => m.PostsResourceModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
