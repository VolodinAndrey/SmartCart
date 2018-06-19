import {Injectable} from '@angular/core';
import {ReplaySubject, BehaviorSubject} from 'rxjs/Rx';
import {Product} from '../shop/category/category.component';


export class Order {
  typeof_delivery: string;
  typeof_payment: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  // product_list: [number, number][]; // id, count
  product_list: {product: Product, count: number}[];
  constructor() {
    this.product_list = [];
  }
}

@Injectable()
export class CartService {
  public order: Order;
  public order$: BehaviorSubject<Order>;
  public addToCart(product: Product) {
    if (this.order.product_list.find(p => p.product.id === product.id)) {
      return;
    } else {
      this.order.product_list.push({product, count: 1});
    }
    this.next(this.order);
  }
  public next(order) {
    this.order$.next(order);
    localStorage.setItem('order', JSON.stringify(this.order));
  }
  public remove() {
    this.next(new Order());
    localStorage.removeItem('order');
  }
  constructor() {
    this.order = JSON.parse(localStorage.getItem('order')) || new Order();
    this.order$ = new BehaviorSubject(this.order);
  }
}
