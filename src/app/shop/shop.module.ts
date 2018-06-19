import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShopRoutingModule} from './shop-routing.module';
import {CategoriesComponent} from './categories/categories.component';
import {CategoryComponent} from './category/category.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {ProductComponent} from './product/product.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  declarations: [CategoriesComponent, CategoryComponent, ProductComponent]
})
export class ShopModule {}
