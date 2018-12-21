import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { HeaderComponent } from '../Pages/header/header.component';
import { OrderComponent } from '../Pages/order/order.component';
import { FooterComponent } from '../Pages/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
// Services
import {OrderService } from '../../src/Services/order.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    OrderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [ModalModule],
  providers: [OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
