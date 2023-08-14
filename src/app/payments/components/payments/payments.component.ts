import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { Pagamento } from '../../models/pagamento';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'acoes'];
  dataSource: Pagamento[] = [];
  dataSourceFiltered: Pagamento[] = [];
  searchForm: FormGroup;
  eventoPagina = new PageEvent();
  ordenacao: Sort = {active: 'id', direction: 'desc'};

  constructor(
    public dialog: MatDialog,
    private service: PaymentService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.searchForm = this._fb.group({term: null});
    this.eventoPagina.pageSize = 10;
    this.eventoPagina.pageIndex = 0;
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar(this.searchForm.value.term, this.eventoPagina, this.ordenacao).subscribe({
      next: data => {
        this.dataSource = data.body as Pagamento[];
        this.dataSourceFiltered = this.dataSource;
        this.eventoPagina.length = Number(data.headers.get('X-Total-Count'));
      },
      error: erro => {
        console.error(erro);
        this._snackBar.open('Erro ao listar pagamentos', 'OK', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
  }

  mostrarFormulario(id?: number) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: id,
      height: '550px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.listar();
    });
  }

  mostrarConfirmacao(item: Pagamento, acao: 'pagamento' | 'remoção') {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      data: {operacao: acao, item: item },
      height: '220px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.listar();
    });
  }

  paginacao(evento?: PageEvent) {
    if (evento) this.eventoPagina = evento;
    this.listar();
  }

  ordenar(evento: Sort) {
    this.ordenacao = evento;
    this.listar();
  }

}
