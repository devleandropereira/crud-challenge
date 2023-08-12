import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pagamento } from '../models/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  URL = environment.apiUrl + 'pagamentos';

  constructor(
    private http: HttpClient
  ) { }

  public salvar(params: Pagamento) {
    return this.http.post(this.URL, params);
  }

  public pagar(id: number) {
    return this.http.patch(this.URL + '/' + id, {pago: true});
  }

  public alterar(params: Pagamento) {
    return this.http.put(this.URL + '/' + params.id, params);
  }

  public encontrarPorId(id: number) {
    return this.http.get<Pagamento>(this.URL + '/' + id);
  }

  public remover(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }

  public listar() {
    return this.http.get<Pagamento[]>(this.URL);
  }

}
