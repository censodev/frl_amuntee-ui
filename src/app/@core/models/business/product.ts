import { Store } from './store';
import { Supplier } from './supplier';
export class Product {
    id: number;
    code: string;
    name?: string;
    baseCost: number;
    supplier: Supplier;
    shippingTime?: any;
    processingTime?: any;
    createdAt?: any;
    updatedAt?: any;
    createdBy?: any;
    updatedBy?: any;
    status: any;
    bodyHtml: string;
    productType: string;
    publishedAt?: any;
    publishedScope: string;
    tags: string;
    title: string;
    variants?: ProductVariant[];
    vendor: string;
    store: Store;
    shopifyId: number;
    images?: ProductImage[];
}

export class ProductVariant {
    id: number;
    shopifyId: number;
    barcode: string;
    compareAtPrice: number;
    createdAt: string;
    imageId: number;
    price: number;
    sku: string;
    title: string;
    updatedAt: string;
    product: Product;
}

export class ProductImage {
    id: number;
    shopifyId: number;
    position: number;
    src: string;
    width: number;
    height: number;
    attachment: string;
    product: Product;
}
