import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { MatTableModule } from '@angular/material/table';
import * as mock from './../mock/payments.mock';
import { Sort } from '@angular/material/sort';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableComponent ],
      imports: [ MatTableModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir evento para alterar pagamento', () => {
    spyOn(component.alterar, 'emit');
    component.alterarPag(1);
    expect(component.alterar.emit).toHaveBeenCalled();
  });

  it('deve emitir evento para remover pagamento', () => {
    spyOn(component.remover, 'emit');
    component.removerPag(mock.pagamentoTeste);
    expect(component.remover.emit).toHaveBeenCalled();
  });

  it('deve emitir evento para marcar como registro como pago', () => {
    spyOn(component.pagar, 'emit');
    component.marcarPago(mock.pagamentoTeste);
    expect(component.pagar.emit).toHaveBeenCalled();
  });

  it('deve emitir evento para marcar como registro como pago', () => {
    const sort: Sort = {active: 'id', direction: 'desc'};
    spyOn(component.ordenar, 'emit');
    component.sortData(sort);
    expect(component.ordenar.emit).toHaveBeenCalled();
  });

});
