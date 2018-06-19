import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {MatTabsModule, MatCardModule, MatButtonModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [UserService],
  declarations: [AuthComponent],
  entryComponents: [AuthComponent],
  exports: [AuthComponent]
})
export class AuthModule {}
