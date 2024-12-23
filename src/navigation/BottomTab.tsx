import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favorites from "../screens/Favorites";
import Basket from "../screens/Basket";
import Profile from "../screens/Profile";
import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { bottomTabBarHeight } from "../constants";

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabBarIcons: Record<keyof RootTabParamList, string> = {
  Basket: 'shopping-basket',
  Favorites: 'heart-o',
  Home: 'home',
  Search: 'search',
  Profile: 'user'
}

const CustomTabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <View
            key={index.toString()}
            style={{ flex: 1, backgroundColor: '#fff', height: bottomTabBarHeight, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1 }}
          >
            <TouchableOpacity
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
            >
              <Icon
                name={TabBarIcons[route.name as never]}
                size={isFocused ? 28 : 24}
                color={isFocused ? '#5962ff' : '#c8c8c8'}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const BottomTab = () => {

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Basket" component={Basket} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default BottomTab;