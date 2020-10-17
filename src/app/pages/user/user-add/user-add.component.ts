import { NbToastrService } from '@nebular/theme';
import { UserService } from 'app/@core/services/user.service';
import { User } from './../../../@core/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  user = new User();
  roles: any[];

  constructor(private userService: UserService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.user.roleId = 2;
    this.roles = this.userService.roles();
  }

  onSubmit() {
    this.user.username = this.user.code;
    this.user.password = this.user.code;

    this.userService.add(this.user).subscribe(
      res => {
        this.toastrService.show('New user has been added successfully.', 'Successful !', { status: 'success' });
      },
      err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }
}
