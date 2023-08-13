import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { Pagamento } from '../../models/pagamento';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'titulo', 'data', 'valor', 'pago', 'acoes'];
  dataSource: Pagamento[] = [];
  dataSourceFiltered: Pagamento[] = [];
  searchForm: FormGroup;
  eventoPagina = new PageEvent();

  constructor(
    public dialog: MatDialog,
    private service: PaymentService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder
  ) {
    this.searchForm = this._fb.group({term: null});
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.dataSource = this.service.listar();
    this.dataSourceFiltered = this.dataSource;
    this.eventoPagina = {
      length: this.dataSourceFiltered.length,
      pageIndex: 0,
      pageSize: 10
    }
    // this.service.listar().subscribe({
    //   next: data => {
    //     this.dataSource = data;
    //     this.dataSourceFiltered = this.dataSource;
    //   },
    //   error: erro => {
    //     console.error(erro);
    //     this._snackBar.open('Erro ao listar pagamentos', 'Ok', {
    //       duration: 5000,
    //       horizontalPosition: 'end',
    //       verticalPosition: 'top',
    //     });
    //   }
    // });
  }

  mostrarFormulario(id?: number) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {id: id, dataSource: this.dataSource},
      height: '470px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Pagamento[]) => {
      if (result?.length) {
        this.dataSource = result.map(data => data);
        this.dataSourceFiltered = this.dataSource.map(data => data);
      }
    });
  }

  mostrarConfirmacao(item: Pagamento, acao: 'pagamento' | 'remoção') {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      data: {operacao: acao, item: item, dataSource: this.dataSource },
      height: '180px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: Pagamento[]) => {
      if (result?.length || typeof result === 'object') {
        this.dataSource = result.map(data => data);
        this.dataSourceFiltered = this.dataSource.map(data => data);
      }
    });
  }

  pesquisar() {
    if (!this.searchForm.value.term) {
      this.dataSourceFiltered = this.dataSource;
      return;
    }
    const termo = this.searchForm.value.term.trim().toLowerCase();
    if (termo) {
      this.dataSourceFiltered = this.dataSource.filter(item =>
        item.usuario.toLowerCase().includes(termo)
        || item.data.toString().toLowerCase().includes(termo)
        || item.titulo.toString().toLowerCase().includes(termo)
        || item.valor.toString().includes(termo)
      );
    } 
  }

  paginacao(evento: PageEvent) {
    this.eventoPagina = evento;
    const end = (this.eventoPagina.pageIndex + 1) * this.eventoPagina.pageSize;
    const start = this.eventoPagina.pageIndex * this.eventoPagina.pageSize;
    const part = this.dataSource.slice(start, end);
    this.dataSourceFiltered = part;
  }

}
