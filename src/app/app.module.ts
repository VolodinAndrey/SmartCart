import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import 'hammerjs';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {HeaderModule} from './header/header.module';
import {ShopModule} from './shop/shop.module';
import {CartModule} from './cart/cart.module';
import {TokenInterceptor} from './auth/services/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {StaticModule} from './static/static.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    StaticModule,
    HeaderModule,
    ShopModule,
    CartModule
  ],
  // providers: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
