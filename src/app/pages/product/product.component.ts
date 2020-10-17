import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductService } from './../../@core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  settings = {
    mode: 'external',
    // hideSubHeader: true,
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
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      type: {
        title: 'Type',
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
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.productService.listProducts().subscribe(res => {
      const data = res.content.map(i => {
        return {
          ...i,
          type: i.type.name,
          supplier: i.supplier.name,
        };
      });
      this.source.load(data);
    });
  }

  onEdited(evt: any) {
    this.router.navigate(['pages/product', evt.data.id]);
  }

  onAdded() {
    this.router.navigate(['pages/product/add']);
  }
}
