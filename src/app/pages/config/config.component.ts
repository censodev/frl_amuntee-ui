import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ConfigService } from './../../@core/services/config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  source = new LocalDataSource();
  settings = {
    hideSubHeader: true,
    actions: {
      delete: false,
      add: false,
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
      telegramBotToken: {
        title: 'Telegram Bot Token',
        type: 'string',
      },
      facebookToken: {
        title: 'Facebook Token',
        type: 'string',
      },
    },
  };

  constructor(private configService: ConfigService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.configService.list().subscribe(res => {
      this.source.load(res.content.filter(i => i.status === 1));
    });
  }

  onEdited(evt: any) {
    this.configService.update(evt.newData)
      .subscribe(res => {
        evt.confirm.resolve();
        this.toastrService.show('Config has been updated successfully.', 'Successful !', { status: 'success' });
      }, err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }

}
