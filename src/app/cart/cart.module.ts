import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatRadioModule, MatSelectModule, MatDialogModule
} from '@angular/material';
import {ConfirmComponent} from './confirm/confirm.component';
import { CartService } from './cart.service';
import { ResultComponent } from './confirm/result/result.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    CartRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  entryComponents: [ResultComponent],
  declarations: [CartComponent, ConfirmComponent, ResultComponent],
  providers: [CartService],
})
export class CartModule {}
