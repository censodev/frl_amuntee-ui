import { NbCardModule, NbButtonModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';


@NgModule({
  declarations: [SupplierComponent],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
  ],
})
export class SupplierModule { }
