import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Store } from '../types/store.type';

const slice = createSlice({
    initialState: [] as Store.State.Favorite[],
    name: 'favorite',
    reducers: {
        add: (state, action: PayloadAction<Store.State.Favorite>) => {
            return [...state, action.payload];
        },
        remove: (state, action: PayloadAction<{id: string}>) => {
            const index = state.findIndex((each) => each.id === action.payload.id);
            state.splice(index, 1);

            return state;
        }
    },
});

export const favoriteActions = slice.actions;

export default slice.reducer;