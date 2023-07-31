import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowChartComponent } from './component/show-chart/show-chart.component';

const routes: Routes = [
  { path: '', component: ShowChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
