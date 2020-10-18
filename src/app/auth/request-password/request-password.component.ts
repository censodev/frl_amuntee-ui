import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent implements OnInit {
  user = {
    email: '',
  };

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  requestPass() {
    this.authService.requestPassword(this.user.email)
      .subscribe(
        res => {
          this.toastrService.success('Check your mail now !', 'Successful !');
          setTimeout(() => {
            this.router.navigate(['/auth/reset-password']);
          }, 1000);
        },
        err => this.toastrService.danger('Something went wrong. Please try again.', 'Unauthorized'),
      );
  }
}
