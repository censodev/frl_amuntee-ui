import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatisticSummaryComponent } from './statistic-summary/statistic-summary.component';
import { NbCardModule, NbDatepickerModule, NbInputModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { StatisticFilterComponent } from './statistic-filter/statistic-filter.component';
import { StatisticFeeComponent } from './statistic-fee/statistic-fee.component';
import { StatisticProductTypeComponent } from './statistic-product-type/statistic-product-type.component';
import { StatisticSellerComponent } from './statistic-seller/statistic-seller.component';
import { StatisticProductDesignComponent } from './statistic-product-design/statistic-product-design.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticSummaryComponent,
    StatisticFilterComponent,
    StatisticFeeComponent,
    StatisticProductTypeComponent,
    StatisticSellerComponent,
    StatisticProductDesignComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgxEchartsModule,
    NbDatepickerModule,
    NbInputModule,
    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    Ng2SmartTableModule,
  ],
})
export class DashboardModule { }
