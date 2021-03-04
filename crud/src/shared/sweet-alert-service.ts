import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SweetAlertService {
  private subject = new Subject<any>();

  sweetAlert: any = swal;

  constructor() {
  }

  // tslint:disable-next-line:typedef
  public success(heading: string, message: string, type = 'success') {

  }

  // tslint:disable-next-line:typedef
  public error(heading: string, message: string, type = 'error') {

  }

  // tslint:disable-next-line:typedef
  public showErrorInformation(error: any) {
    switch (error.status) {
      case 401: {
        swal.fire({
          title: 'UNAUTHORIZED ACCESS',
          text: 'Invalid Client Credentials, Please Login!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        });
        break;
      }

      case 409: {
        swal.fire({
          title: 'Fund name',
          text: 'Fund name already exists.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        });
        break;
      }

      case 403: {
        swal.fire({
          title: 'ACCESS DENIED',
          text: 'Invalid Client Credentials, Please Login!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        });
        break;
      }

      case 503: {
        swal.fire({
          title: 'System Temporarily Unavailable',
          text: 'System undergoing maintenance or is otherwise temporarily unavailable!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        });
        break;
      }
      default: {
        swal.fire({
          title: 'Request processing error',
          text: 'Request processing error, Please try later!',
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
        });
      }
    }
  }

  /** Method to show success sweet alert */
  showSuccessSweetAlert(succesMsg: string, icon: string): Observable<any> {

    this.sweetAlert.fire({
      text: succesMsg,
      icon,
      showCancelButton: false,
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.subject.next(true);
      }
    });

    return this.subject.asObservable();

  }

  /** Method to show Warning,  error sweet alert */
  showWarningErrorSweetAlert(errMsg: string, icon: string): Observable<any> {

    this.sweetAlert.fire({
      text: errMsg,
      icon,
      showCancelButton: false,
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.subject.next(true);
      }
    });

    return this.subject.asObservable();

  }

  /*method to show deletion confirmation */
  showSweetAlertForConfirmation(text: string): Observable<any> {
    this.sweetAlert.fire({
      title: 'Are you sure?',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.subject.next(true);
      } else if (result.dismiss === swal.DismissReason.cancel) {
        this.subject.next(false);
      }
    });
    return this.subject.asObservable();
  }


}
