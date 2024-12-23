import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
    initialState: {
        isLoading: false,
        warning: {
            active: false,
            message: '',
        }
    },
    name: 'app',
    reducers: {
        setLoading: (state, action:PayloadAction<boolean>) => {
            return {
                ...state,
                isLoading: action.payload
            }
        },
        setWarning: (state, action: PayloadAction<{ active: boolean, message: string }>)=> {
            return {
                ...state,
                warning: action.payload
            }
        }
    },
});

export const appActions = slice.actions;

export default slice.reducer;