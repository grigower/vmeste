import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { scheduleReminder } from '@/lib/notifications';

export default function Planner() {
	const [selected, setSelected] = useState<string | undefined>();
	const markedDates = selected
		? { [selected]: { selected: true, selectedColor: '#2A9D8F' } }
		: {};

	async function createReminder() {
		if (!selected) return;
		const when = new Date(selected + 'T09:00:00');
		await scheduleReminder(when, 'Напоминание', 'Проверьте план на сегодня');
	}

	return (
		<View style={{ flex: 1 }}>
			<Calendar
				onDayPress={(d: any) => setSelected(d.dateString)}
				markedDates={markedDates}
			/>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 12 }}>
				<Text>Выбрано: {selected || '—'}</Text>
				<TouchableOpacity onPress={createReminder} style={{ backgroundColor: '#FDE68A', padding: 8, borderRadius: 8 }}>
					<Text>Добавить напоминание</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}