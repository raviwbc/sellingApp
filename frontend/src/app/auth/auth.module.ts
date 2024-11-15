import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegsitorComponent } from './regsitor/regsitor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegsitorComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedmoduleModule,
  ]
})
export class AuthModule { }
