import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
	namespace ReactNavigation {
		interface RootParamList
			extends RootTabParamList,
                RootStackParamList {}
	}
}

export type RootStackParamList = {
  HomeA: undefined;
  ProfileA: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  ProductList: { brand: string };
  ProductDetail: { name: string };
  SearchFilter: undefined;
};

export type RootTabParamList = {
  Home: undefined,
  Search: undefined,
  Favorites: undefined,
  Basket: undefined,
  Profile: undefined
}

// type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

