import { StoreService } from './../../../@core/services/store.service';
import { Product, ProductTemplate } from './../../../@core/models/business/product';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductService } from 'app/@core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'app/@core/models/business/supplier';
import { SupplierService } from 'app/@core/services/supplier.service';
import { Store } from 'app/@core/models/business/store';

@Component({
  selector: 'ngx-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  product = new Product();
  stores: Store[];
  templates: ProductTemplate[];
  ckeditorConfig = {
    height: '500px',
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

  constructor(private productService: ProductService,
              private toastrService: NbToastrService,
              private route: ActivatedRoute,
              private storeService: StoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.storeService.listStores(999999).subscribe(res => this.stores = res.content);
    this.productService.listTemplates(999999).subscribe(res => this.templates = res.content);
    this.route.params.subscribe(params => {
      this.productService.findOne(params['id']).subscribe(res => {
        this.product = res;
        this.product.productTemplate = this.product.productTemplate || new ProductTemplate();
        console.log(this.product)
      });
    });
  }

  onSubmit() {
    this.productService.updateProduct(this.product).subscribe(
      res => {
        this.toastrService.show('Product has been updated successfully.', 'Successful !', { status: 'success' });
        // tslint:disable-next-line: no-console
        console.log(res);
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
        // tslint:disable-next-line: no-console
        console.log(err);
      });
  }

  // variantAdded(evt: any) {
  //   this.router.navigate(['pages/product/variant/add']);
  // }

  // variantEdited(evt: any) {
  //   this.router.navigate(['pages/product/variant', evt.data.id]);
  // }

  variantAdded(evt: any) {
    if (this.product.variants.some(i => i.option1 === evt.newData.option1)) {
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
