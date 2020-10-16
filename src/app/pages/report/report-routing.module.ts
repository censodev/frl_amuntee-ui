import { ReportSupplierComponent } from './report-supplier/report-supplier.component';
import { ReportSellerComponent } from './report-seller/report-seller.component';
import { ReportTotalSalesComponent } from './report-total-sales/report-total-sales.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'total-sales',
    component: ReportTotalSalesComponent,
  },
  {
    path: 'seller',
    component: ReportSellerComponent,
  },
  {
    path: 'supplier',
    component: ReportSupplierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule { }
