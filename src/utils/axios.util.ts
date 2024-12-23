import axios from "axios";
import { store } from "../store";
import { appActions } from "../store/app.reducer";

const api = axios.create({
    baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io',
});

api.interceptors.request.use(
    request => {
        store.dispatch(appActions.setLoading(true));
        return request;
    },
    error => {
        console.log("api request error : ",error);
    }
);

api.interceptors.response.use(
    response => {
        // loading false
        store.dispatch(appActions.setLoading(false));
        return response;
    },
    error => {
        store.dispatch(appActions.setLoading(false));
        return Promise.reject(error);
    }
)

export default api;