import { StoreService } from './../../../@core/services/store.service';
import { Store } from './../../../@core/models/business/store';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.scss'],
})
export class StoreAddComponent implements OnInit {
  store: Store = new Store();

  constructor(private storeService: StoreService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.storeService.addStore(this.store).subscribe(
      res => {
        this.toastrService.show('New store has been added successfully.', 'Successful !', { status: 'success' });
      },
      err => {
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }

}
