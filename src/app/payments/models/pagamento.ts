export interface Pagamento {
    id: number;
    name: string;
    username: string;
    title: string;
    date: Date | string;
    image?: string;
    isPayed: boolean;
    value: number;
}