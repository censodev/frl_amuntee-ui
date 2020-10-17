import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule, NbInputModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';


@NgModule({
  declarations: [UserComponent, UserAddComponent, UserUpdateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
  ],
})
export class UserModule { }
