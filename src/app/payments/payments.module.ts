import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DataTableComponent } from './components/data-table/data-table.component';



@NgModule({
  declarations: [
    DataTableComponent,
    FormComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentsModule { }
