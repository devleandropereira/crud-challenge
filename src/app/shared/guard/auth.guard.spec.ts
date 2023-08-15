import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
const routerStateSnapshotStub: RouterStateSnapshot = <any>{}
let authService: AuthService;
let router: Router;

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('deve validar acesso para usuário não logado', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');
    const result = guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(result).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('deve validar acesso para usuário logado', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const result = guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(result).toBeTruthy();
  });

});
