import AsyncStorage from "@react-native-async-storage/async-storage"

type Keys = '@brands'

export const setItem = async (key: Keys, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value);
}

export const getItem = (key: Keys): Promise<string | null> => {
    return AsyncStorage.getItem(key);
}

export const setBrandsStorage = (brands: string[]) => {
    const parsed = brands.join(',');
    setItem('@brands', parsed);
}

export const getBrandsStorage = async ():Promise<string[] | null> => {
    const brands = await getItem('@brands');
    if (brands) {
        return brands.split(',');
    }
    return null;
}