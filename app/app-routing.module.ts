import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { OrderComponent } from '../Pages/order/order.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'order', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
