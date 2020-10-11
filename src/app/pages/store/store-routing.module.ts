import { StoreAddComponent } from './store-add/store-add.component';
import { StoreComponent } from './store.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
  },
  {
    path: 'add',
    component: StoreAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule { }
