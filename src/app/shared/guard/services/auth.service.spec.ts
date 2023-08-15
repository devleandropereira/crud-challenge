import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve verificar se o usuário passou pelo login', () => {
    window.sessionStorage.clear();
    let loginRealizado: boolean;
    loginRealizado = service.isLoggedIn()
    expect(loginRealizado).toBeFalse();

    window.sessionStorage.setItem('usuarioLogado', JSON.stringify({nome: 'Usuário', email: 'usuario@gmail.com'}));
    loginRealizado = service.isLoggedIn()
    expect(loginRealizado).toBeTruthy();
  });

});
