import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  // {path: '', redirectTo: 'categiries', pathMatch: 'full'},
  {path: 'categories', component: CategoriesComponent},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'product/:id', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
