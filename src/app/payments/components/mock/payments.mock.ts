import { Pagamento } from "../../models/pagamento";

export const pagamentoTeste = <Pagamento>{
    id: 1,
    username: 'Leandro',
    name: 'Leandro',
    title: 123,
    date: new Date(2023, 11, 8),
    value: 123.45,
    isPayed: false
}
  
export class MatSnackBarStub {
    open() {}
}
