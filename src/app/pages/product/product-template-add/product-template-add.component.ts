import { FileService } from './../../../@core/services/file.service';
import { NbToastrService } from '@nebular/theme';
import { ProductService } from 'app/@core/services/product.service';
import { Supplier } from './../../../@core/models/business/supplier';
import { ProductTemplate } from './../../../@core/models/business/product';
import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'app/@core/services/supplier.service';
import { ImagePickerConf } from 'ngp-image-picker';

@Component({
  selector: 'ngx-product-template-add',
  templateUrl: './product-template-add.component.html',
  styleUrls: ['./product-template-add.component.scss']
})
export class ProductTemplateAddComponent implements OnInit {
  productTemplate = new ProductTemplate();
  suppliers: Supplier[];
  imagePickerConf: ImagePickerConf = {
    borderRadius: "4px",
    language: "en",
    width: "100%",
    height: "240px",
  };

  constructor(private supplierService: SupplierService,
              private productService: ProductService,
              private toastrService: NbToastrService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.supplierService.list().subscribe(res => {
      this.suppliers = res.content;
      this.productTemplate.supplier = this.suppliers[0];
    });
  }

  onSubmit() {
    console.log(this.productTemplate);
    this.productService.addTemplate(this.productTemplate).subscribe(
      res => {
        console.log(res);
        this.toastrService.show('New template has been added successfully.', 'Successful !', { status: 'success' });
      },
      err => {
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }

  onImageChanged(evt: any) {
    this.productTemplate.design = evt;
    console.log(this.productTemplate)
  }
}
