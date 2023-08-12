import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Pagamento } from '../../models/pagamento';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
    this.list = this.dataSource;
    const data = this.list.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'usuario':
          return this.compare(a.usuario, b.usuario, isAsc);
        case 'titulo':
          return this.compare(a.titulo, b.titulo, isAsc);
        case 'data':
          return this.compare(a.data.toString(), b.data.toString(), isAsc);
        case 'valor':
          return this.compare(a.valor, b.valor, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
