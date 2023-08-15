import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as mock from './../mock/payments.mock';
import { PaymentService } from '../../services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NO_ERRORS_SCHEMA, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let mockDialogRef: any;
  let service: PaymentService;
  let snack: MatSnackBar;

  async function createComponent(providers: Provider[] = []) {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: 1 },
        MatSnackBar,
        PaymentService,
        FormBuilder,
        ...providers
      ],
      imports: [
        HttpClientModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(PaymentService);
    snack = TestBed.inject(MatSnackBar);
  };

  beforeEach(async () => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar erro na requisição ao buscar pagamento', () => {
    spyOn(service, 'encontrarPorId').and.returnValue(throwError('Erro ao encontrar pagamento'));
    spyOn(snack, 'open');
    component.ngOnInit();
    expect(service.encontrarPorId).toHaveBeenCalled();
    expect(snack.open).toHaveBeenCalled();
  });

  it('deve retornar pagamento selecionado', () => {
    spyOn(service, 'encontrarPorId').and.returnValue(of(mock.pagamentoTeste));
    spyOn(component, 'updateForm');
    component.ngOnInit();
    expect(service.encontrarPorId).toHaveBeenCalled();
    expect(component.updateForm).toHaveBeenCalledWith(mock.pagamentoTeste);
  });

  it('deve chamar método de salvar', () => {
    spyOn(component, 'save');
    const btnSalvar = fixture.debugElement.query(By.css('#btn-salvar'));
    btnSalvar.nativeElement.click();
    expect(component.save).toHaveBeenCalledTimes(1);
  });

  it('deve retornar erro ao tentar alterar pagamento', () => {
    spyOn(service, 'alterar').and.returnValue(throwError('Erro ao alterar registro'));
    spyOn(snack, 'open');
    component.form.setValue(mock.pagamentoTeste);
    component.save();
    expect(service.alterar).toHaveBeenCalledTimes(1);
    expect(snack.open).toHaveBeenCalledTimes(1);
  });

  it('deve salvar novo pagamento', async () => {
    TestBed.resetTestingModule();
    await createComponent([{ provide: MAT_DIALOG_DATA, useValue: null }]);
    TestBed.compileComponents();
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(service, 'salvar').and.returnValue(of(mock.novoPagamento));
    spyOn(snack, 'open');
    component.form.setValue(mock.novoPagamento);
    component.save();
    expect(service.salvar).toHaveBeenCalledTimes(1);
    expect(snack.open).toHaveBeenCalledTimes(1);
  });

  it('deve atualizar o formulário de pagamento', () => {
    spyOn(component, 'dateToForm').and.returnValue('2023-08-11');
    component.updateForm(mock.pagamentoTeste);
    expect(component.form.value.id).toBe(1);
    expect(component.dateToForm).toHaveBeenCalled();
  });

  it('deve retornar o valor de data condicionado ao input', () => {
    const dataTeste = new Date(2023, 7, 12).toJSON();
    const result = component.dateToForm(dataTeste);
    expect(result).toEqual('2023-08-12');
  });

});
