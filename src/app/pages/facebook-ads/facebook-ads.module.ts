import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacebookAdsRoutingModule } from './facebook-ads-routing.module';
import { FacebookAdsComponent } from './facebook-ads.component';


@NgModule({
  declarations: [FacebookAdsComponent],
  imports: [
    CommonModule,
    FacebookAdsRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbIconModule,
  ],
})
export class FacebookAdsModule { }
