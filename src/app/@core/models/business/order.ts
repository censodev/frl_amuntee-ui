export interface Order {
    id: number;
    code: string;
    name: string;
    subTotalPrice: number;
    totalPrice: number;
    paygateName: string;
    financialStatus: string;
    fulfillmentStatus: string;
    createdAt: any;
    updatedAt: any;
    closedAt: any;
    paymentTransactions?: any;
    products?: any;
}
