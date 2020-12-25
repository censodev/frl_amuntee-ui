import { NbInputModule, NbIconModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { ImageGridPickerComponent } from './image-grid-picker/image-grid-picker.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';



@NgModule({
  declarations: [DataTableComponent, ImageGridPickerComponent, ImagePickerComponent],
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
  ],
  exports: [
    DataTableComponent,
    ImageGridPickerComponent,
    ImagePickerComponent,
  ],
})
export class SharedModule { }
