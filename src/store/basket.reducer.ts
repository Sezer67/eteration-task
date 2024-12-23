import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from '../types/store.type';

const slice = createSlice({
    initialState: [] as Store.State.Basket[],
    name: 'basket',
    reducers: {
        add: (state, action: PayloadAction<Store.Payload.Basket.AddBasket>) => {
            return [...state, action.payload];
        },
        updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const product = state.find((item) => item.id === action.payload.id);
            if (product) {
              product.quantity = product.quantity + action.payload.quantity;
              if (product.quantity <= 0) {
                const index = state.indexOf(product);
                state.splice(index, 1);
              }
            }
            return state;
        },
        complete: (state) => {
            // siparişlerim oluşunca bir sipariş id oluştur ve oraya at
            return [];
        }
    },
});

export const basketActions = slice.actions;

export default slice.reducer;