import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Trainers() {
	const [level, setLevel] = useState<'Лёгкий' | 'Средний'>('Лёгкий');
	const [score, setScore] = useState(0);

	return (
		<View style={{ flex: 1, padding: 16 }}>
			<Text style={{ fontSize: 18, marginBottom: 12 }}>Уровень: {level}</Text>
			<View style={{ flexDirection: 'row', marginBottom: 16 }}>
				<TouchableOpacity onPress={() => setLevel('Лёгкий')} style={{ padding: 8, backgroundColor: level==='Лёгкий' ? '#2A9D8F' : '#E5E7EB', borderRadius: 8, marginRight: 8 }}>
					<Text style={{ color: level==='Лёгкий' ? 'white' : '#111827' }}>Лёгкий</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setLevel('Средний')} style={{ padding: 8, backgroundColor: level==='Средний' ? '#2A9D8F' : '#E5E7EB', borderRadius: 8 }}>
					<Text style={{ color: level==='Средний' ? 'white' : '#111827' }}>Средний</Text>
				</TouchableOpacity>
			</View>
			<Text style={{ marginBottom: 12 }}>Прогресс: {score} очков</Text>
			<TouchableOpacity onPress={() => setScore((s) => s + 1)} style={{ padding: 16, backgroundColor: '#FDE68A', borderRadius: 12 }}>
				<Text>Начать упражнение (заглушка)</Text>
			</TouchableOpacity>
		</View>
	);
}