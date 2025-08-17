import { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';

export default function Settings() {
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
	const [darkMode, setDarkMode] = useState(false);
	const [largeText, setLargeText] = useState(false);

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
				<Text>Уведомления</Text>
				<Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
				<Text>Тёмная тема</Text>
				<Switch value={darkMode} onValueChange={setDarkMode} />
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
				<Text>Крупный текст</Text>
				<Switch value={largeText} onValueChange={setLargeText} />
			</View>
			<TouchableOpacity style={{ padding: 12, backgroundColor: '#F3F4F6', borderRadius: 8, marginTop: 8 }}>
				<Text>Управление пользователями (до 5)</Text>
			</TouchableOpacity>
			<TouchableOpacity style={{ padding: 12, backgroundColor: '#F3F4F6', borderRadius: 8, marginTop: 8 }}>
				<Text>Экстренные контакты</Text>
			</TouchableOpacity>
		</View>
	);
}