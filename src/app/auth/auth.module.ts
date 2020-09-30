import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAlertModule, NbButtonModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from 'environments/environment';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: `${environment.apiUrl}/auth`,
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          login: {
            endpoint: '/login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null, // stay on the same page
            },
          },
          register: {
            endpoint: '/register',
            method: 'post',
            redirect: {
              success: '/auth/login',
              failure: null, // stay on the same page
            },
          },
          logout: {
            endpoint: '',
            method: 'post',
          },
          requestPass: {
            endpoint: '',
            method: 'post',
          },
          resetPass: {
            endpoint: '',
            method: 'post',
          },
        }),
      ],
      forms: {},
    }),
  ],
})
export class AuthModule { }
