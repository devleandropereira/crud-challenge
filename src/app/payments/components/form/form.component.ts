import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;
  public carregando = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<FormComponent>,
    public service: PaymentService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id: [null],
      usuario: [null, [Validators.required, Validators.maxLength(15)]],
      titulo: [null, [Validators.required, Validators.min(1), Validators.max(999999999), Validators.maxLength(256)]],
      data: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01), Validators.maxLength(256)]],
      pago: [null]
    });
  }

  ngOnInit(): void {
    if (this.data) this.service.encontrarPorId(this.data).subscribe({
      next: data => {
        this.form.setValue(data);
      }, 
      error: erro => {
        console.error(erro);
        this._snackBar.open('Erro ao encontrar pagamento', 'Ok', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    })
  }

  save() {
    if (this.form.valid) {
      this.carregando = true;
      let operacao = '';
      let requisicao: Observable<any>;
      if (!this.form.value.id) {
        operacao = 'cadastro';
        requisicao = this.service.salvar(this.form.value);
      } else {
        operacao = 'alteração';
        requisicao = this.service.alterar(this.form.value);
      }
      requisicao.subscribe({
        next: () => {
          this._snackBar.open(`Sucesso ao efeturar ${operacao}!` , 'Ok', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.carregando = false;
          this.dialogRef.close(true);
        },
        error: erro => {
          console.error(erro);
          this._snackBar.open(`Falha ao efetuar ${operacao}!` , 'Ok', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.carregando = false;
        }
      })
    }
  }
}
