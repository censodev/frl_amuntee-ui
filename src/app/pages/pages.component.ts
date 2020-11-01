import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu: NbMenuItem[];

  constructor(private authService: AuthService) {
    const isAdmin = this.authService.isAdmin();
    this.menu = [
      {
        title: 'BUSINESS',
        group: true,
      },
      {
        title: 'Dashboard',
        icon: 'bar-chart-outline',
        link: '/pages/dashboard',
        home: true,
      },
      {
        title: 'Reports',
        icon: 'file-text-outline',
        children: [
          {
            title: 'Total Sales',
            link: '/pages/report/total-sales',
          },
          {
            title: 'Order By Sellers',
            link: '/pages/report/seller',
          },
          {
            title: 'Supplier Base Cost',
            link: '/pages/report/supplier',
          },
        ],
      },
      {
        title: 'Dispute',
        icon: 'trending-down-outline',
        link: '/pages/dispute',
        hidden: !isAdmin,
      },
      {
        title: 'Facebook Ads',
        icon: 'facebook-outline',
        link: '/pages/facebook-ads',
        hidden: !isAdmin,
      },
      {
        title: 'Facebook Tokens',
        icon: 'settings-2-outline',
        link: '/pages/config',
        hidden: !isAdmin,
      },
      {
        title: 'CMS',
        group: true,
        hidden: !isAdmin,
      },
      {
        title: 'Stores',
        icon: 'shopping-bag-outline',
        link: '/pages/store',
        hidden: !isAdmin,
      },
      {
        title: 'Suppliers',
        icon: 'home-outline',
        link: '/pages/supplier',
        hidden: !isAdmin,
      },
      {
        title: 'Products',
        icon: 'archive-outline',
        link: '/pages/product',
        // children: [
        //   {
        //     title: 'List',
        //     link: '/pages/product',
        //   },
        //   {
        //     title: 'Product Types',
        //     link: '/pages/product/type',
        //   },
        // ],
        hidden: !isAdmin,
      },
      {
        title: 'ACCOUNT',
        group: true,
        hidden: !isAdmin,
      },
      {
        title: 'Users',
        icon: 'people-outline',
        link: '/pages/user',
        hidden: !isAdmin,
      },
    ];
  }
}
