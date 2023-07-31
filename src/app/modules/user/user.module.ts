import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ShowChartComponent } from './component/show-chart/show-chart.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    ShowChartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,


  ]
})
export class UserModule { }
