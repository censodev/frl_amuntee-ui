import { AuthService } from 'app/auth/auth.service';
import { Product } from './../../@core/models/business/product';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from './../../@core/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  settings = {
    mode: 'external',
    // hideSubHeader: true,
    pager: { display: false },
    actions: {
      // add: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      picture: {
        title: 'Picture',
        type: 'html',
        valuePrepareFunction: (picture: string) => `<img width="80" src="${picture}" />`,
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      template: {
        title: 'Template',
        type: 'string',
      },
      vendor: {
        title: 'Vendor',
        type: 'string',
      },
      store: {
        title: 'Store',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  source: any[];

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    const createdBy = this.authService.isAdmin() ? 0 : this.authService.getUid();
    this.productService.listProducts(createdBy, 10000000).subscribe(res => {
      const data = res.content.map(i => {
        return {
          ...i,
          store: i.store.name,
          picture: i.images[0]?.src,
          template: i.productTemplate?.code,
        };
      });
      console.log(data);
      this.source = data;
    });
  }

  onEdited(evt: any) {
    this.router.navigate(['pages/product', evt.data.id]);
  }

  onAdded() {
    this.router.navigate(['pages/product/add']);
  }
}
