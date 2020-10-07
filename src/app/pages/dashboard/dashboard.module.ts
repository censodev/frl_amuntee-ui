import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevenueModule } from '../revenue/revenue.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RevenueModule,
  ],
})
export class DashboardModule { }
