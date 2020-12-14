export class Supplier {
    id: number;
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    status: number;

    constructor(id?: number) {
        this.id = id;
    }
}
