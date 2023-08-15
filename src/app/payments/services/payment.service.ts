import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagamento } from '../models/pagamento';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  URL = environment.apiUrl + 'tasks';

  constructor(
    private http: HttpClient
  ) { }

  public salvar(params: Pagamento) {
    return this.http.post<Pagamento>(this.URL, params);
  }

  public pagar(id: number) {
    return this.http.patch(this.URL + '/' + id, {isPayed: true});
  }

  public alterar(params: Pagamento) {
    return this.http.put<Pagamento>(this.URL + '/' + params.id, params);
  }

  public encontrarPorId(id: number) {
    return this.http.get<Pagamento>(this.URL + '/' + id);
  }

  public remover(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }

  public listar(termo = '', eventoPagina: PageEvent, ordenacao: Sort) {
    const paramTermo = termo ? 'title=' + termo + '&' : '';
    const index = eventoPagina.pageIndex + 1;
    return this.http.get<Pagamento[]>(
      `${this.URL}?${paramTermo}_page=${index}&_limit=${eventoPagina.pageSize}&_sort=${ordenacao.active}&_order=${ordenacao.direction}`
      , {observe: 'response'}
    );
  }

}
