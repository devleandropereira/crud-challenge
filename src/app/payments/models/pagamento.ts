export interface Pagamento {
    id: number;
    name: string;
    username: string;
    title: string;
    date: Date;
    image?: string;
    isPayed: boolean;
    value: number;
}