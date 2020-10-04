export interface Order {
    id: number;
    code: string;
    name: string;
    subTotalPrice: number;
    totalPrice: number;
    paygateName: string;
    financialStatus: string;
    fulfillmentStatus: string;
    createdAt: Date;
    updatedAt: Date;
    closedAt: Date;
    paymentTransactions?: any;
    products?: any;
}
