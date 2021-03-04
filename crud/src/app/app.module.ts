import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockUIModule } from 'ng-block-ui';


import { SweetAlertService } from '../shared/sweet-alert-service';
import { ApiService } from '../shared/api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BlockUIModule.forRoot(),
  ],
  providers: [SweetAlertService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
