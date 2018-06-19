import {HttpInterceptor, HttpResponse, HttpClient} from '@angular/common/http';
import {HttpRequest} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HttpSentEvent} from '@angular/common/http';
import {HttpHeaderResponse} from '@angular/common/http';
import {HttpProgressEvent} from '@angular/common/http';
import {HttpUserEvent} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';

import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }
  // tslint:disable-next-line:max-line-length
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const token = localStorage.getItem('token');
    if (req.url === 'http://88.81.237.101:8000/api/order/create/' ||
        req.url === 'http://88.81.237.101:8000/api/order/create/') {
      const _req = req.clone({
        setHeaders: {
          'Authorization': `JWT ${token}`
        }
      });
      return next.handle(_req);
    } else {
      return next.handle(req);
    }
  }
}
