import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-product-variant-add',
  templateUrl: './product-variant-add.component.html',
  styleUrls: ['./product-variant-add.component.scss']
})
export class ProductVariantAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log(this.product);
    // return;
    // this.productService.updateProduct(this.product).subscribe(
    //   res => {
    //     this.toastrService.show('Product has been updated successfully.', 'Successful !', { status: 'success' });
    //     // tslint:disable-next-line: no-console
    //     console.log(res);
    //   },
    //   err => {
    //     this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
    //     // tslint:disable-next-line: no-console
    //     console.log(err);
    //   });
  }
}
