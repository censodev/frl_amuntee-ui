import { FormsModule } from './../forms/forms.module';
import { NbInputModule, NbButtonModule, NbIconModule, NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisputeRoutingModule } from './dispute-routing.module';
import { DisputeComponent } from './dispute.component';


@NgModule({
  declarations: [DisputeComponent],
  imports: [
    CommonModule,
    DisputeRoutingModule,
    FormsModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
  ],
})
export class DisputeModule { }
