import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StatisticSummaryComponent } from './statistic-summary/statistic-summary.component';
import { NbCardModule, NbDatepickerModule, NbInputModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { StatisticFilterComponent } from './statistic-filter/statistic-filter.component';


@NgModule({
  declarations: [DashboardComponent, StatisticSummaryComponent, StatisticFilterComponent],
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
  ],
})
export class DashboardModule { }
