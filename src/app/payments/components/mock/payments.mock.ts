import { Pagamento } from "../../models/pagamento";

export const pagamentoTeste = <Pagamento>{
    id: 1,
    username: 'usuario',
    name: 'Usuário',
    title: '123',
    date: new Date(2023, 7, 11),
    value: 123.45,
    isPayed: false,
    image: ''
}

export const novoPagamento = <Pagamento>{
    id: 0,
    username: 'leandrogp',
    name: 'Leandro Pereira',
    title: '456',
    date: new Date(2023, 7, 12),
    value: 456.78,
    isPayed: false,
    image: ''
}
