import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';


@NgModule({
  declarations: [
    DataTableComponent,
    FormComponent,
    ModalConfirmacaoComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    SharedModule
  ]
})
export class PaymentsModule { }
