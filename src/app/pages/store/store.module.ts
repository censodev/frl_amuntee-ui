import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreComponent } from './store.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { StoreAddComponent } from './store-add/store-add.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StoreComponent, StoreAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NbButtonModule,
  ],
})
export class StoreModule { }
