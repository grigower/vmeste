import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Localization from 'expo-localization';
import ru from '@/assets/locales/ru.json';
import { Ionicons } from '@expo/vector-icons';

const t = ru as Record<string, string>;

const ActionButton = ({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) => (
	<TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, margin: 8, backgroundColor: '#EEF6F6', borderRadius: 12 }}>
		<Ionicons name={icon} size={28} color="#2A9D8F" />
		<Text style={{ marginTop: 8, fontSize: 14 }}>{label}</Text>
	</TouchableOpacity>
);

export default function Home({ navigation }: any) {
	const [tip, setTip] = useState<string>('');

	useEffect(() => {
		// simple daily tip rotation placeholder
		setTip(t['tip_of_day']);
	}, []);

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<View style={{ backgroundColor: '#F7F9FB', padding: 16, borderRadius: 12, marginBottom: 16 }}>
				<Text style={{ fontSize: 16 }}>{t['home_quote']}</Text>
			</View>

			<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
				<ActionButton icon="book" label="Рекомендации" onPress={() => navigation.navigate('Recommendations')} />
				<ActionButton icon="game-controller" label="Тренажёры" onPress={() => navigation.navigate('Trainers')} />
				<ActionButton icon="calendar" label="Планировщик" onPress={() => navigation.navigate('Planner')} />
				<ActionButton icon="document-text" label="Дневник" onPress={() => navigation.navigate('Diary')} />
				<ActionButton icon="help-buoy" label="Помощь рядом" onPress={() => navigation.navigate('HelpNearby')} />
			</View>

			<TouchableOpacity
				style={{ marginTop: 16, backgroundColor: '#E63946', borderRadius: 12, padding: 16, alignItems: 'center' }}
				onPress={() => Alert.alert('Срочная помощь', 'Вызвать экстренную службу или связаться с близкими?', [
					{ text: 'Отмена', style: 'cancel' },
					{ text: 'Скорая' },
					{ text: 'Полиция' },
					{ text: 'Позвонить близким' },
				])}
			>
				<Text style={{ color: 'white', fontSize: 16 }}>🚨 Срочная помощь</Text>
			</TouchableOpacity>

			<View style={{ marginTop: 16, backgroundColor: '#FFF2E6', padding: 12, borderRadius: 8 }}>
				<Text style={{ fontSize: 14 }}>Подсказка дня: {tip}</Text>
			</View>
		</ScrollView>
	);
}