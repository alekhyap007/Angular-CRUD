import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ApiService } from '../../../shared/api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from '../../../shared/sweet-alert-service';
import { PostDataService } from '../../../shared/postData-service';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss'],
})
export class CreatePostsComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  @Input() postArray: any = [];
  postForm: FormGroup;
  mapIdData: any;
  routeParameters: Subscription;
  selectedId: any;
  subscription: any;
  updateFlag = false;
  viewFlag: any;
  viewOnly: any;
  alertSubscribe: any;
  currentPost: any;
  postService: Subscription;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private alertService: SweetAlertService,
    private router: Router,
    private postDataService: PostDataService
  ) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
    });

    this.routeParameters = this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.selectedId = params.get('id');
        this.updateFlag = true;
        this.getDetailsById(this.selectedId);
      }

      /*Read only mode on click of view icon  */
      if (params.get('viewOnly')) {
        this.viewOnly = params.get('viewOnly');
      }

      if (this.viewOnly === 'true') {
        this.postForm.disable();
        this.viewFlag = true;
      }
    });
    this.getStaticPostsData();
  }

  // tslint:disable-next-line:typedef
  getStaticPostsData() {
    this.postService = this.postDataService.currentPost.subscribe((user) => {
      this.currentPost = user;
    });
  }
  /* Get post details by ID */
  // tslint:disable-next-line:typedef
  getDetailsById(id) {
    this.blockUI.start('Loading...');
    this.apiService
      .getUsersById('https://jsonplaceholder.typicode.com/posts/', id)
      .subscribe(
        (response) => {
          this.mapIdData = response;
          this.blockUI.stop();
          this.postForm.patchValue({
            userId: this.mapIdData.userId,
            title: this.mapIdData.title,
            body: this.mapIdData.body,
          });
        },
        (err) => {
          this.errorFunction(err);
        }
      );
  }

  /* Save & update based on updateFlag details */
  // tslint:disable-next-line:typedef
  saveDetails() {
    let iconText: string;
    let confirmMsg;
    let confirmText;
    iconText = 'success';

    if (this.updateFlag) {
      confirmMsg = 'Would you like to update this request?';
      confirmText = 'Updated successfully!';
    } else {
      confirmMsg = 'Would you like to submit this request?';
      confirmText = 'Submitted successfully!';
    }
    this.subscription = this.alertService
      .showSweetAlertForConfirmation(confirmMsg)
      .subscribe((data) => {
        this.subscription.unsubscribe();
        if (data) {
          this.createNewPosts(iconText, confirmText);
        }
      });
  }

  // tslint:disable-next-line:typedef
  createNewPosts(iconText, confirmText) {
    const id = this.selectedId;
    const postObj = {
      title: this.postForm.value.title,
      body: this.postForm.value.body,
      userId: this.postForm.value.userId,
    };

    if (!this.updateFlag) {
      this.apiService
        .postUsers('https://jsonplaceholder.typicode.com/posts', postObj)
        .subscribe(
          (data) => {
            this.currentPost.push(data);
            this.postDataService.setCurrentPost(this.currentPost);
            this.blockUI.stop();
            this.subscription = this.alertService
              .showSuccessSweetAlert(confirmText, iconText)
              .subscribe(() => {
                this.subscription.unsubscribe();
                this.redirectToDashboard();
              });
          },
          (err) => {
            this.errorFunction(err);
          }
        );
    } else {
      this.apiService
        .updateById('https://jsonplaceholder.typicode.com/posts/', postObj, id)
        .subscribe(
          (data) => {
            this.blockUI.stop();
            this.subscription = this.alertService
              .showSuccessSweetAlert(confirmText, iconText)
              .subscribe(() => {
                this.subscription.unsubscribe();
                this.redirectToDashboard();
              });
          },
          (err) => {
            this.errorFunction(err);
          }
        );
    }
  }

  /*Redirect to dashboard */
  // tslint:disable-next-line:typedef
  redirectToDashboard() {
    this.router.navigate(['posts/postsDashboard']);
  }

  // tslint:disable-next-line:typedef
  onReset() {
    this.postForm.reset();
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
