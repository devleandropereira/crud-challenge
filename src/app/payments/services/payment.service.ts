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

  public salvar(novo: Pagamento, params: Pagamento[]): Pagamento[] {
    let max = 0; 
    params.forEach(item => {if (item.id > max) max = item.id});
    novo.id = max + 1;
    params.push(novo);
    return params;
    // return this.http.post(this.URL, params);
  }

  public pagar(id: number, params: Pagamento[]): Pagamento[] {
    return params.map(item => {
      if (id === item.id) item.pago = true;
      return item;
    });
    // return this.http.patch(this.URL + '/' + id, {pago: true});
  }

  public alterar(itemParaAlteracao: Pagamento, params: Pagamento[]) {
    params.forEach(item => {
      if (itemParaAlteracao.id == item.id) {
        item.data = itemParaAlteracao.data;
        item.pago = itemParaAlteracao.pago;
        item.titulo = itemParaAlteracao.titulo;
        item.valor = itemParaAlteracao.valor;
        item.usuario = itemParaAlteracao.usuario;
      }
    });
    return params;
    // return this.http.put(this.URL + '/' + params.id, params);
  }

  public encontrarPorId(id: number, params: Pagamento[]): Pagamento {
    return params.find(item => item.id === id) || <Pagamento>{};
    // return this.http.get<Pagamento>(this.URL + '/' + id);
  }

  public remover(id: number, params: Pagamento[]): Pagamento[] {
    const index = params.findIndex(item => item.id === id);
    params.splice(index, 1);
    return params || [];
    // return this.http.delete(this.URL + '/' + id);
  }

  public listar() {
    return [
      {
        id: 1,
        titulo: 1,
        usuario: "Leandro",
        valor: 1.79,
        data: "2023-07-15",
        pago: true
      },
      {
        id: 2,
        titulo: 2,
        usuario: "Leandro",
        valor: 4.26,
        data: "2023-07-01",
        pago: false
      },
      {
        id: 3,
        titulo: 3,
        usuario: "Maria",
        valor: 6.1,
        data: "2023-06-12",
        pago: true
      },
      {
        id: 4,
        titulo: 4,
        usuario: "Maria",
        valor: 9.22,
        data: "2023-07-03",
        pago: false
      },
      {
        id: 5,
        titulo: 5,
        usuario: "Rogério",
        valor: 10.1,
        data: "2023-05-05",
        pago: false
      },
      {
        id: 6,
        titulo: 6,
        usuario: "Fernando",
        valor: 12.07,
        data: "2023-08-22",
        pago: false
      },
      {
        id: 7,
        titulo: 7,
        usuario: "Patrícia",
        valor: 14.67,
        data: "2023-01-13",
        pago: true
      },
      {
        id: 8,
        titulo: 8,
        usuario: "Leandro",
        valor: 15.94,
        data: "2023-02-22",
        pago: true
      },
      {
        id: 10,
        titulo: 10,
        usuario: "Maria",
        valor: 20.97,
        data: "2023-05-15",
        pago: true
      },
      {
        id: 11,
        usuario: "Corinthians",
        titulo: 123,
        data: "2023-01-01",
        valor: 123,
        pago: true
      },
      {
        id: 12,
        usuario: "Cássio Ramos",
        titulo: 15,
        data: "2023-12-15",
        valor: 15.15,
        pago: false
      },
      {
        id: 13,
        usuario: "Fagner",
        titulo: 321,
        data: "2023-01-03",
        valor: 500.00,
        pago: true
      }
    ]
    // return this.http.get<Pagamento[]>(this.URL);
  }

}
