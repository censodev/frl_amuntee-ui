import { ActivatedRoute } from '@angular/router';
import { User } from './../../../@core/models/user';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { UserService } from 'app/@core/services/user.service';

@Component({
  selector: 'ngx-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  user = new User();
  roles: any[];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.roles = this.userService.roles();
    this.route.params.subscribe(params => {
      this.userService.find(params['id']).subscribe(res => {
        this.user = res;
      });
    });
  }

  onSubmit() {
    this.user.username = this.user.code;
    this.user.password = this.user.code;

    this.userService.update(this.user).subscribe(
      res => {
        this.toastrService.show('This user has been updated successfully.', 'Successful !', { status: 'success' });
      },
      err => {
        // tslint:disable-next-line: no-console
        console.log(err);
        this.toastrService.show('Somethings went wrong. Please try again.', 'Failed !', { status: 'danger' });
      });
  }

}
