import { ProductType } from './product-type';
import { Supplier } from './supplier';
export class Product {
    id: number;
    code: string;
    name: string;
    baseCost: number;
    type: ProductType;
    supplier: Supplier;
    shippingTime?: any;
    processingTime?: any;
    createdAt?: any;
    updatedAt?: any;
    createdBy?: any;
    updatedBy?: any;
    status: number;
}
