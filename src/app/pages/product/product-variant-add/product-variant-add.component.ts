import { NbToastrService } from '@nebular/theme';
import { ProductService } from './../../../@core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductVariant } from 'app/@core/models/business/product';

@Component({
  selector: 'ngx-product-variant-add',
  templateUrl: './product-variant-add.component.html',
  styleUrls: ['./product-variant-add.component.scss']
})
export class ProductVariantAddComponent implements OnInit {
  variant = new ProductVariant();

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private toastrService: NbToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.findOne(params['id']).subscribe(res => {
        this.variant.product = res;
        console.log(this.variant)
      })
    })
  }

  onSubmit() {
    this.productService.createVariant(this.variant).subscribe(
      res => {
        this.toastrService.show('Variant has been created successfully.', 'Successful !', { status: 'success' });
        console.log(res);
        this.router.navigate(['pages/product', this.variant.product.id]);
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
        console.log(err);
      });
  }
}
