import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ProductVariantAddComponent } from './product-variant-add/product-variant-add.component';
import { ProductVariantUpdateComponent } from './product-variant-update/product-variant-update.component';
import { ProductTemplateComponent } from './product-template/product-template.component';
import { ProductTemplateAddComponent } from './product-template-add/product-template-add.component';
import { ProductTemplateUpdateComponent } from './product-template-update/product-template-update.component';
import { NgpImagePickerModule } from 'ngp-image-picker';


@NgModule({
  declarations: [ProductComponent, ProductAddComponent, ProductUpdateComponent, ProductVariantAddComponent, ProductVariantUpdateComponent, ProductTemplateComponent, ProductTemplateAddComponent, ProductTemplateUpdateComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NbButtonModule,
    NbSelectModule,
    SharedModule,
    CKEditorModule,
    NgpImagePickerModule,
  ],
})
export class ProductModule { }
