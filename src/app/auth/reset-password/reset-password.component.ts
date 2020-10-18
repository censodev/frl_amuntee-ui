import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  user = {
    email: '',
    password: '',
    confirmPassword: '',
    resetCode: '',
  };

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  resetPass() {
    this.authService
      .resetPassword(this.user.email, this.user.password, this.user.confirmPassword, this.user.resetCode)
      .subscribe(
        res => {
          this.toastrService.success('Your password is reset successfully !', 'Successful !');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        err => this.toastrService.danger('Something went wrong. Please try again.', 'Unauthorized'),
      );
  }

}
