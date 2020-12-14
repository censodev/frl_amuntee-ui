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
        valuePrepareFunction: (picture: string) => { return `<img class="w-100" src="${picture}" />`; },
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      baseCost: {
        title: 'Base Cost',
        type: 'string',
      },
      supplier: {
        title: 'Supplier',
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
              private router: Router) { }

  ngOnInit(): void {
    this.productService.listProducts(10000000).subscribe(res => {
      const data = res.content.map(i => {
        return {
          ...i,
          supplier: i.supplier?.name,
          store: i.store.name,
          picture: i.images[0]?.src,
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
