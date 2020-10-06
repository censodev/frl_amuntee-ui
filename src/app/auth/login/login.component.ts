import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    this.socialLinks = [];
  }

  login() {
    // tslint:disable-next-line: no-console
    console.log(this.user);
  }

}
