import { NbToastrService } from '@nebular/theme';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {

  }

  login() {
    this.authService.login(this.user.email, this.user.password)
      .subscribe(
        res => {
          this.toastrService.success('Here we go !', 'Successful !');
          this.router.navigate(['/']);
        },
        err => this.toastrService.danger('Your Code name or Password is wrong. Please try again.', 'Unauthorized'),
      );
  }

}
