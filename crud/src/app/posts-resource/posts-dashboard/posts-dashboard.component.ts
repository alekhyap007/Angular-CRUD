import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ApiService } from '../../../shared/api.service';
import { SweetAlertService } from '../../../shared/sweet-alert-service';
import { PostDataService } from '../../../shared/postData-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})

export class PostsDashboardComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  subscription: any;
  postData: any;
  alertSubscribe: any;
  currentPost: any;
  postService: Subscription;
  displayedPostColumns: string[] = [
    'userId',
    'title',
    'body',
    'actions'
  ];

  constructor(private router: Router,
              private apiService: ApiService,
              private alertService: SweetAlertService,
              private postDataService: PostDataService
              ) {}

  ngOnInit(): void {
    this.getStaticPostsData();
  }

  // tslint:disable-next-line:typedef
  getStaticPostsData(){
    this.postService = this.postDataService.currentPost.subscribe(user => {
      this.currentPost = user;
    });
   }
  /*Delete the post based on ID*/
  // tslint:disable-next-line:typedef
  deletePostsDetails(id) {
    let iconText: string;
    iconText = 'success';
    const confirmMsg = 'Would you like to delete?';
    const confirmText = 'deleted successfully!';
    this.subscription = this.alertService.showSweetAlertForConfirmation(confirmMsg).subscribe((data) => {
      this.subscription.unsubscribe();
      if (data) {
        this.deletePost(id, confirmText, iconText);
      }
    });
  }

  // tslint:disable-next-line:typedef
  deletePost(id, confirmText, iconText) {
    this.blockUI.start('Loading...');
    this.currentPost.forEach((element, index) => {
      if (element.id === id) {
        this.currentPost.splice(index, 1);
        this.blockUI.stop();
        this.subscription = this.alertService.showSuccessSweetAlert(confirmText, iconText).subscribe(() => {
          this.subscription.unsubscribe();
          this.currentPost = [...this.currentPost];
        });
      }
    },
    );
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
  viewPostDetails(id, viewOnly) {
    this.apiService.redirectWithTwoParams('posts/postsData', id, viewOnly);
  }

    /** error function */
  // tslint:disable-next-line:typedef
  errorFunction(err) {
    this.blockUI.stop();
    if (
      err.status !== 500 &&
      err.status !== 403 &&
      err.status !== 401 &&
      err.status !== 503
    ) {
      this.alertSubscribe = this.alertService
        .showWarningErrorSweetAlert(err.error.message, 'warning')
        .subscribe((data) => {
          this.alertSubscribe.unsubscribe();
        });
    } else {
      this.blockUI.stop();
      this.alertService.showErrorInformation(err);
    }
    this.blockUI.stop();
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.postService.unsubscribe();
  }

}
