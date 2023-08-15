import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as mock from '../mock/payments.mock';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  let service: PaymentService;
  let snack: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      providers: [
        MatDialog,
        PaymentService,
        MatSnackBar,
        FormBuilder
      ],
      imports: [
        MatDialogModule,
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

    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(PaymentService);
    snack = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar erro ao tentar listar pagamentos', () => {
    spyOn(service, 'listar').and.returnValue(throwError('Erro ao listar pagamentos'));
    spyOn(snack, 'open');
    component.listar();
    expect(service.listar).toHaveBeenCalled();
    expect(snack.open).toHaveBeenCalled();
  });

  it('deve listar pagamentos', () => {
    const resposta = new HttpResponse<any>({body: [mock.pagamentoTeste]});
    resposta.headers.set('X-Total-Count', '1');
    spyOn(service, 'listar').and.returnValue(of(resposta));
    component.searchForm.controls['term'].setValue('');
    component.listar();
    expect(service.listar).toHaveBeenCalled();
    expect(component.dataSource.length).toEqual(1);
  });

  it('deve atualizar lista após salvar formulário', () => {
    let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    spyOn(component, 'listar');

    component.mostrarFormulario(1);

    expect(component.dialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.listar).toHaveBeenCalled();
  });

  it('deve atualizar lista após confirmar remoção ou pagamento', () => {
    let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });
    spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);
    spyOn(component, 'listar');

    component.mostrarConfirmacao(mock.pagamentoTeste, 'pagamento');

    expect(component.dialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(component.listar).toHaveBeenCalled();
  });

  it('deve alterar a páginação da listagem de pagamentos', () => {
    spyOn(component, 'listar');
    const evento: PageEvent = {length: 25, pageIndex: 1, pageSize: 10};
    component.paginacao(evento);
    expect(component.listar).toHaveBeenCalled();
    expect(component.eventoPagina).toEqual(evento);
  });

  it('deve alterar a ordenação da listagem de pagamentos', () => {
    spyOn(component, 'listar');
    const evento: Sort = {active: 'title', direction: 'desc'};
    component.ordenar(evento);
    expect(component.listar).toHaveBeenCalled();
    expect(component.ordenacao.active).toEqual('title');
    expect(component.ordenacao.direction).toEqual('desc');
  });

});
