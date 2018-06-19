import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

export class User {
  email: string;
}
@Injectable()
export class UserService {
  public user: User;
  public user$: BehaviorSubject<User>;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')) || new User();
    this.user$ = new BehaviorSubject(this.user);
  }
  public next(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
  }
  public remove() {
    localStorage.removeItem('user');
    this.user$.next(new User());
  }
}
