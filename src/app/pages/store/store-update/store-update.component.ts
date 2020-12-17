import { Store } from './../../../@core/models/business/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { StoreService } from 'app/@core/services/store.service';

@Component({
  selector: 'ngx-store-update',
  templateUrl: './store-update.component.html',
  styleUrls: ['./store-update.component.scss']
})
export class StoreUpdateComponent implements OnInit {
  store = new Store();

  constructor(private storeService: StoreService,
              private toastrService: NbToastrService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storeService.findOne(params['id']).subscribe(res => {
        this.store = res;
      });
    });
  }

  onSubmit() {
    this.storeService.updateStore(this.store).subscribe(
      res => {
        this.toastrService.show('New store has been added successfully.', 'Successful !', { status: 'success' });
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }
}
