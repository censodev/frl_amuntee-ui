import { Router } from '@angular/router';
import { DataTableComponent } from './../../../shared/data-table/data-table.component';
import { AuthService } from 'app/auth/auth.service';
import { Store } from './../../../@core/models/business/store';
import { NbToastrService } from '@nebular/theme';
import { ProductService } from './../../../@core/services/product.service';
import { Product, ProductTemplate } from './../../../@core/models/business/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'app/@core/services/store.service';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  product = new Product();
  stores: Store[];
  templates: ProductTemplate[];
  ckeditorConfig = {
    height: '400px',
  };
  variantsSettings = {
    pager: { display: false },
    actions: {
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      option1: {
        title: 'Title',
        type: 'string',
      },
      // option2: {
      //   title: 'Option 2',
      //   type: 'string',
      // },
      // option3: {
      //   title: 'Option 3',
      //   type: 'string',
      // },
      barcode: {
        title: 'Barcode',
        type: 'string',
      },
      sku: {
        title: 'SKU',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      compareAtPrice: {
        title: 'Compare At Price',
        type: 'string',
      },
    },
  };
  @ViewChild('variantDataTable') variantDataTable: DataTableComponent;

  constructor(private productService: ProductService,
              private toastrService: NbToastrService,
              private storeService: StoreService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.product.status = 'draft';
    this.product.publishedScope = 'global';
    this.product.variants = [];
    this.storeService.listStores(999999).subscribe(res => {
      this.stores = res.content;
      this.product.store = this.stores[0];
    });
    this.productService.listTemplates(999999).subscribe(res => {
      this.templates = res.content;
      this.product.productTemplate = this.templates[0];
    });
  }

  onSubmit() {
    this.product.createdBy = this.authService.getUid();
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe(
      res => {
        console.log(res);
        this.toastrService.show('New product has been added successfully.', 'Successful !', { status: 'success' });
        this.router.navigate(['/pages/product', res.id]);
      },
      err => {
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }

  variantAdded(evt: any) {
    if (this.product.variants.some(i => i.option1 == evt.newData.option1)) {
      evt.confirm.reject();
      return;
    }
    evt.confirm.resolve(evt.newData);
    this.product.variants = [evt.newData, ...this.product.variants];
  }

  variantEdited(evt: any) {
    if (evt.data.option1 != evt.newData.option1 && this.product.variants.some(i => i.option1 == evt.newData.option1)) {
      evt.confirm.reject();
      return;
    }
    this.product.variants.forEach((i, index) => {
      if (i.option1 == evt.data.option1) {
        this.product.variants[index] = evt.newData;
      }
    })
    evt.confirm.resolve(evt.newData);
    console.log(this.product.variants)
  }
}
