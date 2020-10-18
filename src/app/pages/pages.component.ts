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
    const isAdmin = this.authService.getRole() === 'ROLE_ADMIN';
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
            hidden: !isAdmin,
          },
          {
            title: 'Order By Sellers',
            link: '/pages/report/seller',
          },
          {
            title: 'Supplier Base Cost',
            link: '/pages/report/supplier',
            hidden: !isAdmin,
          },
        ],
      },
      {
        title: 'CMS',
        group: true,
      },
      {
        title: 'Stores',
        icon: 'shopping-bag-outline',
        link: '/pages/store',
      },
      {
        title: 'Suppliers',
        icon: 'home-outline',
        link: '/pages/supplier',
      },
      {
        title: 'Products',
        icon: 'archive-outline',
        children: [
          {
            title: 'List',
            link: '/pages/product',
          },
          {
            title: 'Product Types',
            link: '/pages/product/type',
          },
        ],
      },
      {
        title: 'ACCOUNT',
        group: true,
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
