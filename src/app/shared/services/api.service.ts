import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginParams } from 'src/app/login/models/login-params';
import { Usuario } from 'src/app/login/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL = environment.apiUrl + 'account';

  constructor(
    private http: HttpClient
  ) { }

  public login(params: LoginParams) {
    return this.http.get<Usuario[]>(`${this.URL}?email=${params.email}&password=${params.password}`);
  }

}
