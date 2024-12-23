// import React from 'react';
// import { render, waitFor, fireEvent } from '@testing-library/react-native';

// import {it, jest, describe, afterEach, expect} from '@jest/globals';
// import { productService } from '../src/services';
// import { storageUtils } from '../src/utils';
// import Home from '../src/screens/Home';
// import axios from 'axios';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>; 

// // describe('getProducts', () => {
// //     it('should return product data when API call is successful', async () => {
// //         const mockData = [{ id: 1, name: 'Product1', brand: 'Brand1' }];

// //         mockedAxios.get.mockResolvedValue({ data: mockData });

// //         expect(mockedAxios.get).toHaveBeenCalledWith('https://5fc9346b2af77700165ae514.mockapi.io/products');
// //     });
// // });


// describe('<Home />', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should fetch and render brands from API if storage is empty', async () => {
//     const mockBrands = ['Brand1', 'Brand2', 'Brand3'];
//     const mockResponse = [
//         { brand: 'Brand1' },
//         { brand: 'Brand2' },
//         { brand: 'Brand3' },
//     ]
//     // productService.getProducts.mockResolvedValue([
//     //   { brand: 'Brand1' },
//     //   { brand: 'Brand2' },
//     //   { brand: 'Brand3' },
//     // ]);
//     // storageUtils.getBrandsStorage.mockResolvedValue(null);
//     // storageUtils.setBrandsStorage.mockImplementation(() => {});

//     const { getByText, queryByText } = render(<Home />);

//     expect(queryByText('Brand1')).toBeNull();

//     await waitFor(() => expect(getByText('Brand1')).toBeTruthy());
//     expect(getByText('Brand2')).toBeTruthy();
//     expect(getByText('Brand3')).toBeTruthy();

//     expect(storageUtils.setBrandsStorage).toHaveBeenCalledWith(mockBrands);
//   });

//   it('should fetch and render brands from storage if available', async () => {
//     const mockBrands = ['StoredBrand1', 'StoredBrand2'];
//     // storageUtils.getBrandsStorage.mockResolvedValue(mockBrands);

//     const { getByText } = render(<Home />);

//     await waitFor(() => expect(getByText('StoredBrand1')).toBeTruthy());
//     expect(getByText('StoredBrand2')).toBeTruthy();

//     expect(productService.getProducts).not.toHaveBeenCalled();
//   });

//   it('should render a FlatList with brands', async () => {
//     const mockBrands = ['BrandA', 'BrandB'];
//     // storageUtils.getBrandsStorage.mockResolvedValue(mockBrands);

//     const { getByText } = render(<Home />);

//     await waitFor(() => expect(getByText('BrandA')).toBeTruthy());
//     expect(getByText('BrandB')).toBeTruthy();
//   });
// });
