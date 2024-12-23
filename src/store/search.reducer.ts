import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from "../types/store.type";
import { Product } from "../types/product.type";

const PAGE_SIZE = 12;

const initialState: Store.State.Search = {
    allProducts: [], // searchTerm e göre değişecek, searchTerm boşaldığında all products olacak.
    result: [],
    filter: [],
    sort: Store.State.SearchSort.ANY,
    page: 0,
    size: PAGE_SIZE,
    searchTerm: '',
}

const slice = createSlice({
    name: 'search',
    initialState: { ...initialState },
    reducers: {
        setAllProducts: (state, action: PayloadAction<Product.Product[]>) => {
            const res = action.payload.slice(0, PAGE_SIZE);

            const uniqueBrands = [...new Set(action.payload.map((item) => item.brand ))];
            const uniqueModels = [...new Set(action.payload.map((item) => item.model ))];;
            const brands = uniqueBrands.map((val) => ({ name: val, check: false }));
            const models = uniqueModels.map((val) => ({ name: val, check: false }));
            
            return {
                ...state,
                allProducts: action.payload,
                page: 1,
                result: res,
                filter: [{ title: 'Model', data: models }, { title: 'Marka', data: brands }],
            }
        },
        setSort: (state, action: PayloadAction<Store.State.SearchSort>) => {
            // set Result from all products
            let result = [];
            switch (action.payload) {
                case Store.State.SearchSort.ASC_PRICE:
                    result = [...state.allProducts].sort((a, b) => Number(a.price) - Number(b.price));
                case Store.State.SearchSort.DESC_PRICE:
                    result = [...state.allProducts].sort((a, b) => Number(b.price) - Number(a.price));
                case Store.State.SearchSort.ASC_NAME:
                    result = [...state.allProducts].sort((a, b) => a.name.localeCompare(b.name));
                case Store.State.SearchSort.DESC_NAME:
                    result = [...state.allProducts].sort((a, b) => b.name.localeCompare(a.name));
                default:
                    result = [...state.allProducts];
            }
            const res = result.slice(0, (state.page + 1) * PAGE_SIZE);
            return {
                ...state,
                result: res,
                allProducts: result,
                sort: action.payload
            }
        },
        setResult: (state, action: PayloadAction<Product.Product[]>) => {
            return {
                ...state,
                result: action.payload,
            }
        },
        nextStep: (state) => {
            const res = state.allProducts.slice(0, (state.page + 1) * PAGE_SIZE);
            return {
                ...state,
                page: state.page + 1,
                result: res,
            }
        },
        setFilter: (state, action: PayloadAction<Store.State.Filter[]>) => {
            return {
                ...state,
                filter: action.payload
            }
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                searchTerm: action.payload
            }
        }
    }
});

export const searchActions = slice.actions;

export default slice.reducer;