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
    component: ReportTotalSalesComponent,
  },
  {
    path: 'supplier',
    component: ReportTotalSalesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule { }
