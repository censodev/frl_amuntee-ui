import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { DashboardModule } from './../dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportSellerComponent } from './report-seller/report-seller.component';
import { ReportSupplierComponent } from './report-supplier/report-supplier.component';
import { ReportTotalSalesComponent } from './report-total-sales/report-total-sales.component';

@NgModule({
  declarations: [ReportSellerComponent, ReportSupplierComponent, ReportTotalSalesComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    DashboardModule,
    NbCardModule,
    Ng2SmartTableModule,
  ],
})
export class ReportModule { }
