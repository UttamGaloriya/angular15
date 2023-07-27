import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AuthChildGuard } from 'src/app/authgaurd/auth-child.guard';

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      { path: 'product', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      { path: 'categories', loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'image', loadChildren: () => import('../images/images.module').then(m => m.ImagesModule) },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule), canLoad: [AuthChildGuard] },
      { path: 'list', loadChildren: () => import('../list/list.module').then(m => m.ListModule) },
      { path: '', redirectTo: 'product', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
