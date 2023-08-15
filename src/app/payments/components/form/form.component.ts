import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pagamento } from '../../models/pagamento';
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
      username: [null, [Validators.required, Validators.maxLength(20)]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      title: [null, [Validators.required, Validators.maxLength(30)]],
      date: [null, Validators.required],
      value: [null, [Validators.required, Validators.min(0.01), Validators.maxLength(14)]],
      image: [null],
      isPayed: [false]
    });
  }

  ngOnInit(): void {      
    if (this.data) {
      this.service.encontrarPorId(this.data).subscribe({
        next: data => {
          this.updateForm(data);
        }, 
        error: erro => {
          console.error(erro);
          this._snackBar.open('Erro ao encontrar pagamento', 'OK', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
    }
  }

  save() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.carregando = true;
      let operacao = '';
      let requisicao: Observable<Pagamento>;
      const params = this.form.value;
      params.date = this.dateToSave();
      params.username = params.username.toLowerCase();
      if (!params.id) {
        operacao = 'cadastro';
        requisicao = this.service.salvar(params);
      } else {
        operacao = 'alteração';
        requisicao = this.service.alterar(params);
      }
      requisicao.subscribe({
        next: () => {
          this._snackBar.open(`Sucesso ao efeturar ${operacao}!` , 'OK', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.carregando = false;
          this.dialogRef.close(true);
        },
        error: erro => {
          console.error(erro);
          this._snackBar.open(`Falha ao efetuar ${operacao}!` , 'OK', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.carregando = false;
        }
      });
    }
  }

  updateForm(params: Pagamento) {
    this.form.controls['id'].patchValue(params.id);
    this.form.controls['username'].patchValue(params.username);
    this.form.controls['name'].patchValue(params.name);
    this.form.controls['title'].patchValue(params.title);
    this.form.controls['date'].patchValue(this.dateToForm(params.date));
    this.form.controls['value'].patchValue(params.value);
    this.form.controls['image'].patchValue(params.image);
    this.form.controls['isPayed'].patchValue(params.isPayed);
  }

  dateToForm(date: Date | string) {
    const newDate = date.toString().split('-');
    return newDate[0] + '-' + newDate[1] + '-' + newDate[2].substring(0, 2);
  }

  dateToSave() {
    const newDate = this.form.controls['date'].value.toString().split('-');
    const dateForm = new Date(newDate[0], Number(newDate[1]) - 1, newDate[2]);
    return dateForm.toJSON();
  }

}
