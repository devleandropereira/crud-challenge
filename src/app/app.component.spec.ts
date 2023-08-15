import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA, Provider } from '@angular/core';

class MockRouter {
  public navigationEnd = new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login');
  public events = new Observable(observer => {
    observer.next(this.navigationEnd);
    observer.complete();
  });
}

class MockRouterNoLogin {
  public navigationEnd = new NavigationEnd(0, 'http://localhost:4200/payments', 'http://localhost:4200/payments');
  public events = new Observable(observer => {
    observer.next(this.navigationEnd);
    observer.complete();
  });
}

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let router: Router;

describe('AppComponent', () => {
  async function createComponent(providers: Provider[] = []) {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter },
        ...providers
      ],
      imports: [
        RouterModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    createComponent();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('deve atribuir o valor de logado como falso', async () => {
    component.ngOnInit();
    expect(component.isLogged).toBeFalsy();
  });

  it('deve atribuir o valor de logado como verdadeiro', async () => {
    TestBed.resetTestingModule();
    await createComponent([{ provide: Router, useClass: MockRouterNoLogin }]);
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'configuraCabecalho');
    component.ngOnInit();
    expect(component.isLogged).toBeTrue();
    expect(component.configuraCabecalho).toHaveBeenCalled();
  });

  it('deve configurar o cabeçalho da página', () => {
    window.sessionStorage.setItem('usuarioLogado', JSON.stringify({nome: 'Usuário', email: 'usuario@gmail.com'}));
    component.configuraCabecalho();
    expect(component.user).toEqual('Usuário');
    expect(component.isLogged).toBeTruthy();
  });

});
