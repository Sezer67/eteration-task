export namespace Product {
    export interface Product {
        createdAt: string,
        name: string,
        image: string,
        price: string,
        description: string,
        model: string,
        brand: string,
        id: string
    }
    export interface ProductQueryParams {
        name?: string;
        brand?: string;
        search?: string;
    }
}