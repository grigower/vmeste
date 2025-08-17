import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import data from '@/assets/data/recommendations.json';
import { Ionicons } from '@expo/vector-icons';
import { getItemJson, setItemJson, STORAGE_KEYS } from '@/lib/storage';

type Article = { id: string; title: string; category: string };

export default function Recommendations() {
	const [query, setQuery] = useState('');
	const [favorites, setFavorites] = useState<Record<string, boolean>>({});

	const articles: Article[] = data.articles as Article[];
	const filtered = articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

	useEffect(() => {
		getItemJson<Record<string, boolean>>(STORAGE_KEYS.favorites, true, {}).then((v) => setFavorites(v || {}));
	}, []);

	async function toggleFavorite(id: string) {
		const next = { ...favorites, [id]: !favorites[id] };
		setFavorites(next);
		await setItemJson(STORAGE_KEYS.favorites, next, true);
	}

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<TextInput
				placeholder="Поиск по статьям"
				value={query}
				onChangeText={setQuery}
				style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, marginBottom: 12 }}
			/>
			<FlatList
				data={filtered}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<View style={{ flexShrink: 1, paddingRight: 8 }}>
							<Text style={{ fontWeight: '600' }}>{item.title}</Text>
							<Text style={{ color: '#6B7280', marginTop: 4 }}>{item.category}</Text>
						</View>
						<TouchableOpacity onPress={() => toggleFavorite(item.id)}>
							<Ionicons name={favorites[item.id] ? 'bookmark' : 'bookmark-outline'} size={22} color={favorites[item.id] ? '#2A9D8F' : '#6B7280'} />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}