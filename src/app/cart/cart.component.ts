import { Component, OnInit } from '@angular/core';
import { CartService, Order } from './cart.service';
import { Product } from '../shop/category/category.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  order: Order;
  total: number;
  products: {product: Product, count: number}[];
  constructor(private cart: CartService) { }

  ngOnInit() {
    this.cart.order$.subscribe(c => {
      this.order = c;
      this.products = this.order.product_list;
    });
    this.calcTotal();
  }
  public delete(p: Product) {
    this.order.product_list = this.order.product_list.filter(c => c.product !== p);
    this.cart.next(this.order);
  }
  public calcTotal() {
    this.total = 0;
    this.order.product_list.forEach(p => {
      this.total += p.count * p.product.price;
    });
  }


}
