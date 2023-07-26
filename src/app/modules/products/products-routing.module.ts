import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyproductComponent } from './myproduct/myproduct.component';

const routes: Routes = [
  { path: '', component: MyproductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
