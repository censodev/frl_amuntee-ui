import { StatisticComponent } from './statistic/statistic.component';
import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: 'statistic',
    component: StatisticComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'order/:code',
    component: OrderDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueRoutingModule { }
