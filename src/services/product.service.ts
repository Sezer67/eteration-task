import { AxiosResponse } from "axios";
import api from "../utils/axios.util"
import { Product } from "../types/product.type";
import { store } from "../store";
import { appActions } from "../store/app.reducer";

export const getProducts = async (query?: Product.ProductQueryParams): Promise<Product.Product[]> => {
    try {
        const { data } = await api.get('/products', { params: query });
        return data;
    } catch (error) {
        store.dispatch(appActions.setWarning({ active: true, message: 'Aradığınız ürün bulunamadı.' }));
        return [];
    }
}