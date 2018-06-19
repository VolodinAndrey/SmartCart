import {Component, OnInit} from '@angular/core';
import {CartService, Order} from '../cart.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  order: Order;
  total = 0;
  delivery = 0;
  form: FormGroup;
  constructor(private cart: CartService, private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.initForm();
    this.cart.order$.subscribe(c => {
      this.order = c;
      this.order.product_list.forEach(p => {
        this.total += p.count * p.product.price;
      });
    });
  }
  initForm() {
    this.form = this.fb.group({
      typeof_delivery: [undefined, []],
      typeof_payment: [undefined, []],
      name: [undefined, []],
      phone: [undefined, [Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(14)]],
      address: [undefined, []],
      email: [undefined, [Validators.email]],
    });
    this.form.get('typeof_delivery').valueChanges.subscribe(c => {
      this.total = 0;
      this.delivery = 0;
      if (c === `Кур'єром`) {
        this.order.product_list.forEach(p => {
          this.delivery += p.count * 10;
        });
        this.delivery += 30;
      }
      this.order.product_list.forEach(p => {
        this.total += p.count * p.product.price;
      });
      this.total += this.delivery;
      console.log(this.delivery);
      console.log(this.total);
    });
  }
  onSubmit() {
    const product_list = this.order.product_list.map(c => [c.product.id, c.count]);
    const result = this.form.value;
    result.surname = '';
    result.product_list = product_list;
    this.http.post('http://88.81.237.101:8000/api/order/create/', result).subscribe((res: any) => {
      if (res.id) {
        this.dialog.open(ResultComponent, {width: '400px', data: {check_code: res.check_code, id: res.id}});
        this.cart.remove();
      }
    });
  }

}
