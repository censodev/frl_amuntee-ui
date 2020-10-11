import { ProductAddComponent } from './product-add/product-add.component';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'add',
    component: ProductAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
