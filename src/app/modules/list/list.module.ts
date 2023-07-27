import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './component/list/list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ListFormComponent } from './component/list-form/list-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [

    ListComponent,
    ListFormComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ListModule { }
