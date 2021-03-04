import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { PostsDashboardComponent } from './posts-dashboard/posts-dashboard.component';
import { PostsResourceComponent } from './posts-resource.component';

const routes: Routes = [
    {
        path: '', component: PostsResourceComponent,
        children: [
            { path: '', redirectTo: 'postsDashboard', pathMatch: 'full' },
            /* ----- START OF Inventory ----- */
            { path: 'postsDashboard', component: PostsDashboardComponent },
            { path: 'postsData', component: CreatePostsComponent },
            { path: 'postsData/:id', component: CreatePostsComponent },
            { path: 'postsData/:id/:viewOnly', component: CreatePostsComponent },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
