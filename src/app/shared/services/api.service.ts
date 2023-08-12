import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginParams } from 'src/app/login/models/login-params';
import { Usuario } from 'src/app/login/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = environment.apiUrl + 'usuarios';

  constructor(
    private http: HttpClient
  ) { }

  public login(params: LoginParams): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.URL}?user=${params.user}&senha=${params.senha}`);
  }

}
