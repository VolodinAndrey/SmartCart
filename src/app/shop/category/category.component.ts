import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CartService } from '../../cart/cart.service';

export interface Product {
  id: string;
  category: string;
  characteristics: {criterion: {name: string}, value: string}[];
  description: string;
  images: {image: string}[];
  liked: any[];
  likes_count: number;
  name: string;
  price: number;
  provider: {
    address: string;
    description: string;
    image: string;
    name: string;
  };
}
export interface Category {
  id: string;
  criterion: {name: string}[];
  description: string;
  image: string;
  name: string;
  products: Product[];
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public category: Category;
  public criteria: string;
  constructor(private activatedRouter: ActivatedRoute, private http: HttpClient, private cart: CartService) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe(p => {
      this.http.get<Category>(`http://88.81.237.101:8000/api/category/${p['id']}`).subscribe(c => {
        this.category = c;
        this.sortProducts('likes');
      });
    });
  }
  public toggleLike(item) {
    const headers = new HttpHeaders().set('Authorization', `JWT ${localStorage.getItem('token')}`);
    this.http.get(`http://88.81.237.101:8000/api/product/${item.id}/like`, {headers}).subscribe((c: any) => {
      if (c.ok) {
        item.liked = false;
        item.likes_count += 1;
      }
    }, error => {
      this.http.get(`http://88.81.237.101:8000/api/product/${item.id}/dislike`, {headers}).subscribe((c: any) => {
        if (c.ok) {
          item.liked = true;
          item.likes_count -= 1;
        }
      });
    });
  }

  public sortProducts(type: string) {
    this.criteria = type;
    if (type === 'cheap') {
      this.category.products.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (type === 'expensive') {
      this.category.products.sort((a, b) => {
        if (a.price < b.price) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (type === 'likes') {
      this.category.products.sort((a, b) => {
        if (a.likes_count < b.likes_count) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  }

}
