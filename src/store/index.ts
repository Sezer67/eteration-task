import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import basketReducer from './basket.reducer';
import favoriteReducer from './favorites.reducer';
import searchReducer from './search.reducer';
import appReducer from './app.reducer';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['basket', 'favorite'],
	blacklist: ['search', 'app'],
};

const rootReducer = combineReducers({
    basket: basketReducer,
    favorite: favoriteReducer,
    search: searchReducer,
    app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: true,
                ignoredPaths: ['register', 'rehydrate'],
            }
        })
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const persistor = persistStore(store);