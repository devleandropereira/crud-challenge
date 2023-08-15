import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import * as mock from './mock/login.mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: ApiService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder,
        Router,
        ApiService
      ],
      imports: [
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar mensagem de erro ao usuário na tentativa falha de login', () => {
    spyOn(service, 'login').and.returnValue(throwError('Erro na consulta ao servidor'));
    component.loginForm.controls['email'].setValue('usuario@hotmail.com');
    component.loginForm.controls['password'].setValue('usuario');
    component.login();
    expect(component.mensagemErro).toEqual('Erro na consulta ao servidor');
    expect(service.login).toHaveBeenCalledTimes(1);
  });

  it('deve retornar mensagem de erro ao usuário na tentativa de login com usuário não encontrado', () => {
    spyOn(service, 'login').and.returnValue(of([]));
    component.loginForm.controls['email'].setValue('teste@teste.com');
    component.loginForm.controls['password'].setValue('teste');
    component.login();
    expect(component.mensagemErro).toEqual('Usuário/Senha não encontrados');
    expect(component.noAuth).toBeTruthy();
    expect(service.login).toHaveBeenCalledTimes(1);
  });

  it('deve efetuar login', () => {
    spyOn(sessionStorage, 'setItem');
    spyOn(router, 'navigate');
    spyOn(service, 'login').and.returnValue(of([mock.usuarioTeste]));
    component.loginForm.controls['email'].setValue('usuario@gmail.com');
    component.loginForm.controls['password'].setValue('usuario');
    component.login();
    expect(service.login).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/payments']);
    expect(sessionStorage.setItem).toHaveBeenCalled();
  });

  it('deve redirecionar usuário logado', () => {
    spyOn(router, 'navigate');
    window.sessionStorage.setItem('usuarioLogado', JSON.stringify({nome: 'Usuário', email: 'usuario@gmail.com'}));
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/payments']);
  });

});
