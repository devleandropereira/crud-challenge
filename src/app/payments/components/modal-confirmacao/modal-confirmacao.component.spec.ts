import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacaoComponent } from './modal-confirmacao.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import * as mock from './../mock/payments.mock';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Provider } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ModalConfirmacaoComponent', () => {
  let component: ModalConfirmacaoComponent;
  let fixture: ComponentFixture<ModalConfirmacaoComponent>;
  let service: PaymentService;
  let _snackBar: MatSnackBar;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ModalConfirmacaoComponent>>;

  async function createComponent(providers: Provider[] = []) {
    const dialogSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmacaoComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogSpy },
        { provide: MAT_DIALOG_DATA, useValue: {operacao: 'pagamento', item: mock.pagamentoTeste} },
        MatSnackBar,
        PaymentService,
        ...providers
      ],
      imports: [
        HttpClientModule,
        MatTooltipModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(PaymentService);
    _snackBar = TestBed.inject(MatSnackBar);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ModalConfirmacaoComponent>>;
  };

  beforeEach(async () => {
    createComponent();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar método de confirmar', () => {
    spyOn(component, 'confirmar');
    const btnConfirmar = fixture.debugElement.query(By.css('#btn-confirmar'));
    btnConfirmar.nativeElement.click();
    expect(component.confirmar).toHaveBeenCalled();
  });

  it('deve retornar alerta de erro ao usuário ao confirmar', () => {
    spyOn(service, 'pagar').and.returnValue(throwError('Erro ao confirmar pagamento'));
    spyOn(_snackBar, 'open');
    component.confirmar();
    expect(service.pagar).toHaveBeenCalledTimes(1);
    expect(_snackBar.open).toHaveBeenCalledTimes(1);
  });

  it('deve confirmar pagamento do registro', () => {
    spyOn(service, 'pagar').and.returnValue(of({}));
    spyOn(_snackBar, 'open');
    component.confirmar();
    expect(service.pagar).toHaveBeenCalledTimes(1);
    expect(_snackBar.open).toHaveBeenCalledTimes(1);
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('deve confirmar remoção do registro', async () => {
    TestBed.resetTestingModule();
    await createComponent([{ provide: MAT_DIALOG_DATA, useValue: {operacao: 'remoção', item: mock.pagamentoTeste}}]);
    TestBed.compileComponents();
    fixture = TestBed.createComponent(ModalConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service, 'remover').and.returnValue(of({}));
    spyOn(_snackBar, 'open');
    component.confirmar();
    expect(service.remover).toHaveBeenCalledTimes(1);
    expect(_snackBar.open).toHaveBeenCalledTimes(1);
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

});
