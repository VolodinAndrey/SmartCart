import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Product} from '../category/category.component';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: Product;
  constructor(private activatedRouter: ActivatedRoute, private http: HttpClient, public cart: CartService) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe(p => {
      this.http.get<Product>(`http://88.81.237.101:8000/api/product/${p['id']}`).subscribe(c => {
        console.log(c);
        this.product = c;
      });
    });
  }

}
