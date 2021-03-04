import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private router: Router, private http: HttpClient) {
   }

  private setHeaders(options: any): HttpHeaders {
    const headersConfig = {
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  /*-----APIS ----*/
  // tslint:disable-next-line:ban-types
  postUsers(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${path}`,
      body,
      { headers: this.setHeaders({ multipartFormData: false }) },
    );
  }

  updateById(path: string, body: object, id: any): Observable<any> {
    return this.http.put(`${path}${id}`, body, { headers: this.setHeaders({ multipartFormData: false })});
}


  deleteById(path,id): Observable<any> {
    return this.http.delete(`${path}${id}`, { headers: this.setHeaders({ multipartFormData: false }) });
  }

  getUsers(value: string): Observable<any> {
    return this.http.get(`${value}`, {
      headers: this.setHeaders({ multipartFormData: false })
    });
  }

  getUsersById(value: string, id: string): Observable<any> {
    return this.http.get(`${value}${id}`, {
      headers: this.setHeaders({ multipartFormData: false })
    });
  }

  /* ----- Start of Navigating with params----- */
  // tslint:disable-next-line:typedef
  redirect(routeLink) {
    this.router.navigate([routeLink]);
  }

  // tslint:disable-next-line: typedef
  redirectWithOneParams(routeLink, id) {
    this.router.navigate([routeLink, id]); // navigate and send data from one component to second component
  }

  // tslint:disable-next-line: typedef
  redirectWithTwoParams(routeLink, id, name) {
    this.router.navigate([routeLink, id, name]); // navigate and send data from one component to second component
  }

}
