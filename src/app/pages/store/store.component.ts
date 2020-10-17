import { Router } from '@angular/router';
import { StoreService } from './../../@core/services/store.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {

  settings = {
    mode: 'external',
    // hideSubHeader: true,
    actions: {
      // add: false,
      delete: false,
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
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Store Name',
        type: 'string',
      },
      host: {
        title: 'Host Name',
        type: 'string',
      },
      apiKey: {
        title: 'API Key',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private storeService: StoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.storeService.listStores().subscribe(stores => {
      this.source.load(stores.content);
    });
  }

  onAdded() {
    this.router.navigate(['/pages/store/add']);
  }
}
