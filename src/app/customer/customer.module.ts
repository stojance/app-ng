import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';

@NgModule({
  declarations: [CustomerComponent],
  imports: [CommonModule, TranslateModule, CustomerRoutingModule, FormsModule, SharedModule],
})
export class CustomerModule {}
