import { Component, OnInit } from '@angular/core';
import { CartService, Order } from '../cart/cart.service';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public count;
  public user;
  constructor(private cart: CartService, private users: UserService) { }

  ngOnInit() {
    this.cart.order$.subscribe(c => {
      this.count = c.product_list.length;
    });
    this.users.user$.subscribe(u => {
      console.log(u);
      this.user = u;
    });
  }
  public logout() {
    this.users.remove();
  }

}
