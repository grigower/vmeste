import { View, Text, FlatList } from 'react-native';

const contacts = [
	{ id: '1', name: 'Городская поликлиника №1', type: 'Медцентр' },
	{ id: '2', name: 'Аптека 24', type: 'Аптека' },
	{ id: '3', name: 'Реабилитационный центр «Надежда»', type: 'Реабилитация' },
];

export default function HelpNearby() {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ height: 180, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' }}>
				<Text>Карта (заглушка)</Text>
			</View>
			<FlatList
				data={contacts}
				keyExtractor={(i) => i.id}
				renderItem={({ item }) => (
					<View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
						<Text style={{ fontWeight: '600' }}>{item.name}</Text>
						<Text style={{ color: '#6B7280' }}>{item.type}</Text>
					</View>
				)}
			/>
		</View>
	);
}