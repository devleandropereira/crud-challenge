import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacaoComponent } from './modal-confirmacao.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import * as mock from './../mock/payments.mock';

describe('ModalConfirmacaoComponent', () => {
  let component: ModalConfirmacaoComponent;
  let fixture: ComponentFixture<ModalConfirmacaoComponent>;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmacaoComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {operacao: 'pagamento', item: mock.pagamentoTeste, dataSource: [mock.pagamentoTeste]} },
        { provide: MatSnackBar, useClass: mock.MatSnackBarStub },
        PaymentService,
      ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
