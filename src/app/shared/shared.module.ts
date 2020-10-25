import { NbInputModule, NbIconModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';



@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
  ],
  exports: [
    DataTableComponent,
  ],
})
export class SharedModule { }
