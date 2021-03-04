import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ApiService } from '../../../shared/api.service';
import { SweetAlertService } from '../../../shared/sweet-alert-service';
import { PostDataService } from '../../../shared/postData';

@Component({
  selector: 'app-posts-dashboard',
  templateUrl: './posts-dashboard.component.html',
  styleUrls: ['./posts-dashboard.component.scss']
})
export class PostsDashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  subscription: any;
  postData: any;
  alertSubscribe: any;
  propertyStaticData: any;
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
              ) { }

  ngOnInit(): void {
    this.getPostsData();
    this.getStaticPostsData();
  }

  // tslint:disable-next-line:typedef
  getStaticPostsData(){
    this.postDataService.getPostsDetails().subscribe(data => {
      this.propertyStaticData = data;
      console.log(this.propertyStaticData);
    });
   }
  /*Get all posts data*/
  // tslint:disable-next-line:typedef
  getPostsData() {
    this.blockUI.start('Loading...');
    this.apiService.getUsers('https://jsonplaceholder.typicode.com/posts').subscribe(response => {
      this.blockUI.stop();
      this.postData = response;
    },
    (err) => {
      this.errorFunction(err);
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
    const selectPos = this.propertyStaticData.indexOf(id);
    this.propertyStaticData.forEach(element => {
      if (element.id === id) {
        this.propertyStaticData.splice(selectPos, 1);
        setTimeout(() => { this.blockUI.stop(); }, 1500);
        this.subscription = this.alertService.showSuccessSweetAlert(confirmText, iconText).subscribe(() => {
          this.subscription.unsubscribe();
        });
        this.postData = this.propertyStaticData;
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


}
