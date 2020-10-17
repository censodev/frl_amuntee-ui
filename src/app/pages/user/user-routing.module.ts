import { UserUpdateComponent } from './user-update/user-update.component';
import { UserAddComponent } from './user-add/user-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'add',
    component: UserAddComponent,
  },
  {
    path: ':id',
    component: UserUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
