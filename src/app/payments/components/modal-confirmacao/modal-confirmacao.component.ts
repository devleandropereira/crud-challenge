import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pagamento } from '../../models/pagamento';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent {

  public carregando = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {operacao: string, item: Pagamento },
    public dialogRef: MatDialogRef<ModalConfirmacaoComponent>,
    public service: PaymentService,
    private _snackBar: MatSnackBar
  ) { }

  confirmar() {
    this.carregando = true;
    let requisicao: Observable<any>;
    const id: number = this.data.item.id || 0;
    if (this.data.operacao == 'pagamento') {
      requisicao = this.service.pagar(id);
    } else {
      requisicao = this.service.remover(id);
    }
    requisicao.subscribe({
      next: () => {
        this._snackBar.open(`Sucesso ao efeturar ${this.data.operacao}!` , 'OK', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.carregando = false;
        this.dialogRef.close(true);
      },
      error: erro => {
        console.error(erro);
        this._snackBar.open(`Falha ao efetuar ${this.data.operacao}!` , 'OK', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.carregando = false;
      }
    });
  }
}
