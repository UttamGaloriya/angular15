import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      { path: '', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      { path: 'categories', loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'image', loadChildren: () => import('../images/images.module').then(m => m.ImagesModule) },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
