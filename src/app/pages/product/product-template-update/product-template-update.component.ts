import { ActivatedRoute } from '@angular/router';
import { ProductTemplate } from './../../../@core/models/business/product';
import { Supplier } from './../../../@core/models/business/supplier';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ProductService } from 'app/@core/services/product.service';
import { SupplierService } from 'app/@core/services/supplier.service';

@Component({
  selector: 'ngx-product-template-update',
  templateUrl: './product-template-update.component.html',
  styleUrls: ['./product-template-update.component.scss']
})
export class ProductTemplateUpdateComponent implements OnInit {
  suppliers: Supplier[];
  productTemplate = new ProductTemplate();

  constructor(private productService: ProductService,
              private toastrService: NbToastrService,
              private supplierService: SupplierService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.supplierService.list().subscribe(data => this.suppliers = data.content);
    this.route.params.subscribe(params => {
      this.productService.findTemplate(params['id']).subscribe(res => {
        this.productTemplate = res;
        console.log(this.productTemplate)
      });
    });
  }

  onSubmit() {
    console.log(this.productTemplate);
    this.productService.updateTemplate(this.productTemplate).subscribe(
      res => {
        this.toastrService.show('Template has been updated successfully.', 'Successful !', { status: 'success' });
        // tslint:disable-next-line: no-console
        console.log(res);
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
        // tslint:disable-next-line: no-console
        console.log(err);
      });
  }
}
