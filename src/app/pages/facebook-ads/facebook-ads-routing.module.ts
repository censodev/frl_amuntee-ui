import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacebookAdsComponent } from './facebook-ads.component';

const routes: Routes = [{
  path: '',
  component: FacebookAdsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacebookAdsRoutingModule { }
