import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {
  public modalRef: BsModalRef;
  public Menu: any = [];
  public currentOrder = [];
  public size: any = {};
  public totalPrice = 0;
  public crustPrice = 0;
  public selectedMenu = [];
  public selectedOrder = [];
  public count = 0;
  public crustCount = 0;
  public Veggiecount = 0;
  public Cheesecount = 0;
  public Saucecount = 0;
  public maxerror: Boolean;
  public valid: boolean;
  public selected: boolean;
  public selectedTopplings = [];
  public saved: Boolean;
  constructor(private _router: Router, private modalService: BsModalService, private _order: OrderService) {
    this.valid = true;
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }

  onCrustChange(menu, event, index) {
    if (event.target.checked) {
      this.crustCount++;
      this.check();
      this.selectedMenu.push(menu);
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.totalPrice = this.totalPrice + menu.price;
    } else {
      this.crustCount--;
      this.check();
      this.selectedMenu.splice(this.selectedMenu.indexOf(menu.name), 1);
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.totalPrice = this.totalPrice - menu.price;
    }
    if (this.crustCount > 1) {
      this.maxerror = true;
    } else if (this.crustCount < 2) {
      this.maxerror = false;
    }
  }
  onTopplingAdd(menu, event, index) {
    if (event.target.checked) {
      this.count++;
      this.check();
      this.selectedMenu.push(menu);
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.totalPrice = this.totalPrice + menu.price;
    } else {
      this.count--;
      this.check();
      this.selectedMenu.splice(this.selectedMenu.indexOf(menu.name), 1);
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.totalPrice = this.totalPrice - menu.price;
    }
    if (this.count > 3) {
      this.maxerror = true;
    } else if (this.count < 4) {
      this.maxerror = false;
    }
  }

  onVeggiesAdd(menu, event, index) {
    if (event.target.checked) {
      this.Veggiecount++;
      this.check();
      this.selectedMenu.push(menu);
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.totalPrice = this.totalPrice + menu.price;
    } else {
      this.Veggiecount--;
      this.check();
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.selectedMenu.splice(this.selectedMenu.indexOf(menu.name), 1);
      this.totalPrice = this.totalPrice - menu.price;
    }
    if (this.Veggiecount > 5) {
      this.maxerror = true;
    } else if (this.Veggiecount < 6) {
      this.maxerror = false;
    }
  }

  onCheeseAdd(menu, event, index) {
    if (event.target.checked) {
      this.Cheesecount++;
      this.check();
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.selectedMenu.push(menu);
      this.totalPrice = this.totalPrice + menu.price;
    } else {
      this.Cheesecount--;
      this.check();
      localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
      this.selectedMenu.splice(this.selectedMenu.indexOf(menu.name), 1);
      this.totalPrice = this.totalPrice - menu.price;
    }
    if (this.Cheesecount > 1) {
      this.maxerror = true;
    } else if (this.Cheesecount < 2) {
      this.maxerror = false;
    }
  }

  onSaucesAdd(menu, event, index) {
    if (event.target.checked) {
      this.Saucecount++;
      this.check();
      this.selectedMenu.push(menu);
      this.totalPrice = this.totalPrice + menu.price;
    } else {
      this.Saucecount--;
      this.check();
      this.selectedMenu.splice(this.selectedMenu.indexOf(menu.name), 1);
      this.totalPrice = this.totalPrice - menu.price;
    }
  }

  onSidesAdd(menu, event, index) {
    if (event.target.checked) {
      this.selectedMenu.push(menu);
      this.totalPrice = this.totalPrice + menu.price;
    } else {
      this.selectedMenu.splice(this.selectedMenu.indexOf(menu.name), 1);
      this.totalPrice = this.totalPrice - menu.price;
    }
  }
  onExtrasAdd(menu, event) {
    if (event.target.checked) {
      this.selectedMenu.push(menu);
      this.totalPrice = this.totalPrice + menu.price;
    } else {
      this.selectedMenu.splice(this.selectedMenu.indexOf(menu.name), 1);
      this.totalPrice = this.totalPrice - menu.price;
    }
  }
  Add(template: TemplateRef<any>) {
    this.modalRef.hide();
    this.selectedMenu.push(this.totalPrice);
    localStorage.setItem('CurrentOrder', JSON.stringify(this.selectedMenu));
    this._router.navigateByUrl('order');
  }
  check() {
    if (this.crustCount > 0 && this.crustCount < 2 && this.count > 0 && this.count < 4 && this.Veggiecount > 0 && this.Veggiecount < 6
      && this.Cheesecount > 0 && this.Cheesecount < 2 && this.Saucecount > 0 && this.Saucecount < 2) {
      this.valid = false;
    } else {
      this.valid = true;
    }
  }
  ngOnInit() {
    this._order.getMenu().subscribe((res: any) => {
      this.Menu = res;
    });
    this.currentOrder = JSON.parse(localStorage.getItem('CurrentOrder'));
    if (this.currentOrder) {
    this.currentOrder.forEach(menu => {
     this.selectedOrder.push(menu);
    });
  }
  }
}
