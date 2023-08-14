import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { LoginParams } from './../models/login-params';

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
      email: [null, [Validators.required, Validators.maxLength(30)]],
      password: [null, [Validators.required, Validators.maxLength(15)]]
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
        email: this.loginForm.value.email.toString().toLowerCase(),
        password: this.loginForm.value.password.toString().toLowerCase()
      }
      this.apiService.login(params).subscribe({
        next: data => {
          if (data.length && data[0].email) {
            sessionStorage.setItem('usuarioLogado', `{"email": "${data[0].email}", "nome": "${data[0].name}"}`);
            this.router.navigate(['/payments']);
          } else {
            this.noAuth = true;
            this.mensagemErro = 'Usuário/Senha inválidos';
          }
        },
        error: error => {
          console.error(error);
          this.mensagemErro = 'Erro na consulta ao servidor';
        }
      });
    }
  }
  
}
