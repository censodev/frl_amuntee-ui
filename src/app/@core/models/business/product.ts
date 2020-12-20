import { Image } from 'app/shared/image-grid-picker/image';
import { Store } from './store';
import { Supplier } from './supplier';
export class Product {
    id: number;
    createdAt?: any;
    updatedAt?: any;
    createdBy?: number;
    status: string;
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
    productTemplate: ProductTemplate;
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
    option1: string;
    option2: string;
    option3: string;
}

export class ProductImage implements Image {
    id?: number;
    shopifyId?: number;
    position?: number;
    src: string;
    width?: number;
    height?: number;
    product?: Product;
}

export class ProductTemplate {
    id: number;
    code: string;
    title: string;
    baseCost: number;
    supplier: Supplier;
    shippingTime?: any;
    processingTime?: any;
    status: number;
    design: string;
}
