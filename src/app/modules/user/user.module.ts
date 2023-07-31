import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ProfileComponent } from './component/profile/profile.component';


@NgModule({
  declarations: [

  
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,


  ]
})
export class UserModule { }
