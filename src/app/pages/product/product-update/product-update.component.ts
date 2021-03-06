import { FileService } from './../../../@core/services/file.service';
import { StoreService } from './../../../@core/services/store.service';
import { Product, ProductTemplate } from './../../../@core/models/business/product';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductService } from 'app/@core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'app/@core/models/business/supplier';
import { SupplierService } from 'app/@core/services/supplier.service';
import { Store } from 'app/@core/models/business/store';
import { ImagePickerConf } from 'ngp-image-picker';
import { environment } from 'environments/environment';

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
    height: '400px',
  };
  variantsSettings = {
    mode: 'external',
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
              private router: Router,
              private fileService: FileService) { }

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

  variantAdded(evt: any) {
    this.router.navigate(['pages/product', this.product.id, 'variant', 'add']);
  }

  variantEdited(evt: any) {
    this.router.navigate(['pages/product/variant', evt.data.id]);
  }

  onImageChanged(evt: any) {
    console.log(evt)

    if (evt.oldImage?.shopifyId) {
      this.productService.deleteImage(evt.oldImage.shopifyId, this.product.shopifyId, this.product.store.id).subscribe(
        res => console.log(res)
      )
    }

    this.productService.saveImageAsBase64(evt.newImage.src.split(',')[1], this.product.shopifyId, this.product.store.id).subscribe(
      res => {
        this.toastrService.show('Image has been uploaded successfully.', 'Successful !', { status: 'success' });
        console.log(res)
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
        this.product.images = this.product.images.filter((item, index) => index !== evt.index)
        console.log(err)
      }
    );
  }
}
