export interface Pagamento {
    id: number;
    usuario: string;
    titulo: number;
    data: string | Date;
    valor: number;
    pago: boolean;
}