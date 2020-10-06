import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueRoutingModule } from './revenue-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { StatisticComponent } from './statistic/statistic.component';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RevenueCompanyComponent } from './statistic/revenue-company/revenue-company.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { RevenueSellerComponent } from './statistic/revenue-seller/revenue-seller.component';
import { RevenueSupplierComponent } from './statistic/revenue-supplier/revenue-supplier.component';
import { RevenueProductComponent } from './statistic/revenue-product/revenue-product.component';


@NgModule({
  declarations: [OrderComponent, OrderDetailsComponent, StatisticComponent, RevenueCompanyComponent, RevenueSellerComponent, RevenueSupplierComponent, RevenueProductComponent],
  imports: [
    CommonModule,
    RevenueRoutingModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
  ],
})
export class RevenueModule { }
