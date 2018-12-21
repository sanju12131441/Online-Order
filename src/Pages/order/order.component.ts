import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {
  CouponCode;
  totalPrice: any;
  CurrentOrder;
  code = 'OFF10';
  discount = 10;
  success: boolean;
  error: boolean;
  discountPrice;
  FinalPrice;
  OrderSuccess: Boolean;
  constructor() { }
  submit() {
    if (this.CouponCode === this.code) {
      this.success = true;
      this.error = false;
      this.discountPrice = this.totalPrice * (this.discount / 100);
      this.FinalPrice = this.totalPrice - this.discountPrice;
    } else {
      this.error = true;
      this.success = false;
      this.CouponCode = '';
    }

  }

  order() {
this.OrderSuccess = true;
  }
  ngOnInit() {
    this.CurrentOrder = JSON.parse(localStorage.getItem('CurrentOrder'));
    this.totalPrice = this.CurrentOrder.slice(-1);
  }
}
