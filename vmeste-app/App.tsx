import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Home, Recommendations, Trainers, Planner, Diary, HelpNearby, Settings } from './components';

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					const map: Record<string, keyof typeof Ionicons.glyphMap> = {
						Home: 'home',
						Recommendations: 'book',
						Trainers: 'game-controller',
						Planner: 'calendar',
						Diary: 'document-text',
						HelpNearby: 'help-buoy',
						Settings: 'settings',
					};
					const iconName = map[route.name] ?? 'ellipse';
					return <Ionicons name={iconName as any} size={size} color={color} />;
				},
				tabBarLabelStyle: { fontSize: 12 },
				tabBarStyle: { height: 64 },
				headerShown: false,
			})}
		>
			<Tab.Screen name="Home" component={Home} options={{ title: 'Главная' }} />
			<Tab.Screen name="Recommendations" component={Recommendations} options={{ title: 'Рекомендации' }} />
			<Tab.Screen name="Trainers" component={Trainers} options={{ title: 'Тренажёры' }} />
			<Tab.Screen name="Planner" component={Planner} options={{ title: 'Планировщик' }} />
			<Tab.Screen name="Diary" component={Diary} options={{ title: 'Дневник' }} />
			<Tab.Screen name="HelpNearby" component={HelpNearby} options={{ title: 'Помощь рядом' }} />
			<Tab.Screen name="Settings" component={Settings} options={{ title: 'Настройки' }} />
		</Tab.Navigator>
	);
}

export default function App() {
	const colorScheme = useColorScheme();

	const theme: Theme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			primary: '#2A9D8F',
			background: '#FFFFFF',
			card: '#F7F9FB',
			text: '#1F2937',
			border: '#E5E7EB',
			notification: '#E76F51',
		},
	};

	useEffect(() => {
		// reserved for splash, notifications, permissions, localization
	}, []);

	return (
		<NavigationContainer theme={theme}>
			<StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
			<HomeStack.Navigator screenOptions={{ headerShown: false }}>
				<HomeStack.Screen name="Root" component={AppTabs} />
			</HomeStack.Navigator>
		</NavigationContainer>
	);
}
