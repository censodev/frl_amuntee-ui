import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/@core/services/user.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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
      code: {
        title: 'Code',
        type: 'string',
      },
      fullname: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
    },
  };

  source = new LocalDataSource();

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.list()
      .subscribe(res => this.source.load(res.content.map(i => {
        return {
          ...i,
          role: i.roleId === 1 ? 'ADMIN' : 'SELLER',
        };
      })));
  }

  onEdited(evt: any) {
    this.router.navigate(['pages/user', evt.data.id]);
  }

  onAdded() {
    this.router.navigate(['pages/user/add']);
  }

}
