import { Component, OnInit, Optional, Inject, Self } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { SweetAlertService } from '../../../shared/sweet-alert-service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})
export class PostsDashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  subscription: any;
  usersData: any;
  postData: any;
  displayedPostColumns: string[] = [
    'userId',
    'title',
    'body',
    'actions'
  ];

  constructor(private router: Router, private apiService: ApiService,
              private alertService: SweetAlertService) { }

  ngOnInit(): void {
    this.getPostsData();
  }

  /*Get all posts data*/
  // tslint:disable-next-line:typedef
  getPostsData() {
    this.blockUI.start('Loading...');
    this.apiService.getUsers('https://jsonplaceholder.typicode.com/posts').subscribe(response => {
      this.blockUI.stop();
      this.postData = response;
    });
  }

  /*Delete the post based on ID*/
  // tslint:disable-next-line:typedef
  deletePostsDetails(id) {
    const confirmMsg = 'Would you like to delete?';
    const confirmText = 'deleted successfully!';
    this.subscription = this.alertService.showSweetAlertForConfirmation(confirmMsg).subscribe((data) => {
      this.subscription.unsubscribe();
      if (data) {
        this.deletePost(id, confirmMsg);
      }
    });
  }

  // tslint:disable-next-line:typedef
  deletePost(id, confirmText) {
    this.postData.forEach(element => {
      if (element.id === id) {
        this.postData = this.postData.splice(id);
      }
    });
  }

  /*On click Edit Icon navigate to create post page by id*/
  // tslint:disable-next-line:typedef
  editDetails(id) {
    this.apiService.redirectWithOneParams('posts/postsData', id);
  }

  /* On click New Posts navigate to create post page*/
  // tslint:disable-next-line:typedef
  navigateToPosts() {
    this.router.navigate(['posts/postsData']);
  }

  /*On click View Icon navigate to create post page by id*/
  // tslint:disable-next-line:typedef
  viewPostDetails(id) {
    this.apiService.redirectWithOneParams('posts/postsData', id);
  }

}

