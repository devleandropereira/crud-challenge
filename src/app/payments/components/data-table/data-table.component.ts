import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagamento } from '../../models/pagamento';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {

  list: Pagamento[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: Pagamento[] = [];
  @Output() remover = new EventEmitter<Pagamento>();
  @Output() alterar = new EventEmitter<number>();
  @Output() pagar = new EventEmitter<Pagamento>();
  @Output() ordenar = new EventEmitter<Sort>();
  
  constructor() {}
  
  alterarPag(id: number) {
    this.alterar.emit(id);
  }

  removerPag(item: Pagamento) {
    this.remover.emit(item);
  }

  marcarPago(item: Pagamento) {
    this.pagar.emit(item);
  }

  sortData(sort: Sort) {
    this.ordenar.emit(sort);
  }

}
