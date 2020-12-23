import { ProductVariant } from './../../../@core/models/business/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ProductService } from 'app/@core/services/product.service';

@Component({
  selector: 'ngx-product-variant-update',
  templateUrl: './product-variant-update.component.html',
  styleUrls: ['./product-variant-update.component.scss']
})
export class ProductVariantUpdateComponent implements OnInit {
  variant = new ProductVariant();

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private toastrService: NbToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productService.findVariant(params['id']).subscribe(res => {
        this.variant = res;
        console.log(this.variant)
      })
    })
  }

  onSubmit() {
    this.productService.updateVariant(this.variant).subscribe(
      res => {
        this.toastrService.show('Variant has been updated successfully.', 'Successful !', { status: 'success' });
        console.log(res);
        this.router.navigate(['pages/product', this.variant.product.id]);
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
        console.log(err);
      });
  }
}
