import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { LoginParams } from './models/login-params';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public loginForm: FormGroup;
  public submitted = false;
  public noAuth = false;
  public mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      user: [null, [Validators.required, Validators.maxLength(15)]],
      senha: [null, [Validators.required, Validators.maxLength(15)]]
    });
  }

  ngOnInit(): void {
    const tokenStorage = sessionStorage.getItem('usuarioLogado');
    if (tokenStorage) {
      this.router.navigate(['/payments']);
    }
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const params: LoginParams = {
        user: this.loginForm.value.user.toString().toLowerCase(),
        senha: this.loginForm.value.senha.toString().toLowerCase()
      }
      const data = this.apiService.login(params);
      if (data.id) {
        sessionStorage.setItem('usuarioLogado', `{"user": "${data.user}", "nome": "${data.primeiroNome}"}`);
        this.router.navigate(['/payments']);
      } else {
        this.noAuth = true;
        this.mensagemErro = 'Usuário/Senha inválidos';
      }
      // this.apiService.login(params).subscribe({
      //   next: data => {
      //     if (data.length) {
      //       sessionStorage.setItem('usuarioLogado', `{"user": "${data[0].user}", "nome": "${data[0].primeiroNome}"}`);
      //       this.router.navigate(['/payments']);
      //     } else {
      //       this.noAuth = true;
      //       this.mensagemErro = 'Usuário/Senha inválidos';
      //     }
      //   },
      //   error: error => {
      //     console.error(error);
      //     this.mensagemErro = 'Erro na consulta ao servidor';
      //   }
      // });
    }
  }
  
}
