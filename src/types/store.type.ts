import { Product } from "./product.type";

export namespace Store {
    export namespace State {
        export interface Basket extends Product.Product {
            quantity: number
        }
        export interface Favorite extends Product.Product {}
        export interface Search {
            allProducts: Product.Product[],
            filter: Filter[],
            sort: SearchSort,
            result: Product.Product[],
            page: number,
            size: number,
            searchTerm: string,
        }

        export enum SearchSort {
            ANY,
            ASC_PRICE,
            DESC_PRICE,
            ASC_NAME,
            DESC_NAME
        }

        export interface Filter {
            title: 'Model' | 'Marka',
            data: {name: string, check: boolean}[]
        }
    }
    export namespace Payload {
        export namespace Basket {
            export interface AddBasket extends State.Basket {}
        }
    }
}