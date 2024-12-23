import { Store } from '../types/store.type';
import * as storageUtils from './storage.util';

export const updateCheckFilter = (
    filters: Store.State.Filter[],
    title: 'Model' | 'Marka',
    name: string,
): Store.State.Filter[] => {
    return filters.map((filter) =>
        filter.title === title
            ? {
                ...filter,
                data: filter.data.map((item) => {
                    if (item.name === name) {
                        return { ...item, check: true };
                    }
                    if (item.check) {
                        return { ...item, check: false };
                    }
                    return item;
                }),
            }
            : filter
    );
};
export const getActiveFilters = (filters: Store.State.Filter[]) => {
    const activeFilters = filters.reduce<Record<string, string[]>>((acc, filter) => {
        acc[filter.title] = filter.data
            .filter((item) => item.check)
            .map((item) => item.name);
        return acc;
    }, {});
    return {
        brand: activeFilters["Marka"][0] || undefined,
        model: activeFilters["Model"][0] || undefined
    }
};

export {
    storageUtils
}