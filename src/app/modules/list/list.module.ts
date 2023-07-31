import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './component/list/list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ListFormComponent } from './component/list-form/list-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListDialogComponent } from './component/list-dialog/list-dialog.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [

    ListComponent,
    ListFormComponent,
    ListDialogComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ListModule { }
