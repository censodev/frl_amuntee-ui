import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { ProductService } from 'app/@core/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.scss']
})
export class ProductTemplateComponent implements OnInit {
  settings = {
    mode: 'external',
    // hideSubHeader: true,
    pager: { display: false },
    actions: {
      add: false,
      delete: false,
      edit: false,
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
      design: {
        title: 'Design',
        type: 'html',
        valuePrepareFunction: (design: string) => `<img width="80" alt="" src="${design}" />`,
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      code: {
        title: 'Code',
        type: 'string',
      },
      baseCost: {
        title: 'Base Cost',
        type: 'string',
      },
      shippingTime: {
        title: 'Shipping Time',
        type: 'string',
      },
      processingTime: {
        title: 'Processing Time',
        type: 'string',
      },
    },
  };

  source: any[];

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.settings.actions.edit = this.authService.isAdmin();
    this.settings.actions.add = this.authService.isAdmin();
    this.productService.listTemplates().subscribe(res => {
      this.source = res.content;
    });
  }

  onEdited(evt: any) {
    this.router.navigate(['pages/product/template', evt.data.id]);
  }

  onAdded() {
    this.router.navigate(['pages/product/template/add']);
  }
}
