import { NgpImagePickerModule } from 'ngp-image-picker';
import { NbInputModule, NbIconModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { ImageGridPickerComponent } from './image-grid-picker/image-grid-picker.component';



@NgModule({
  declarations: [DataTableComponent, ImageGridPickerComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NgpImagePickerModule,
  ],
  exports: [
    DataTableComponent,
    ImageGridPickerComponent,
  ],
})
export class SharedModule { }
