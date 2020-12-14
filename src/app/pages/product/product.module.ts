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


@NgModule({
  declarations: [ProductComponent, ProductAddComponent, ProductUpdateComponent],
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
  ],
})
export class ProductModule { }
