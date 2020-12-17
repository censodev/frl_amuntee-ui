import { ProductTemplateUpdateComponent } from './product-template-update/product-template-update.component';
import { ProductTemplateAddComponent } from './product-template-add/product-template-add.component';
import { ProductVariantUpdateComponent } from './product-variant-update/product-variant-update.component';
import { ProductVariantAddComponent } from './product-variant-add/product-variant-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductComponent } from './product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTemplateComponent } from './product-template/product-template.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'add',
    component: ProductAddComponent,
  },
  {
    path: 'template',
    component: ProductTemplateComponent,
  },
  {
    path: 'template/add',
    component: ProductTemplateAddComponent,
  },
  {
    path: ':id',
    component: ProductUpdateComponent,
  },
  {
    path: 'template/:id',
    component: ProductTemplateUpdateComponent,
  },
  // {
  //   path: 'variant/add',
  //   component: ProductVariantAddComponent,
  // },
  // {
  //   path: 'variant/:id',
  //   component: ProductVariantUpdateComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
