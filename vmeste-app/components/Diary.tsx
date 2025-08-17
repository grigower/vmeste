import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getItemJson, setItemJson, STORAGE_KEYS } from '@/lib/storage';
import { exportHtmlToPdfAndShare } from '@/lib/pdf';

const templates = [
	'Сегодня спокойный день',
	'Был приступ тревоги',
	'Хорошо спал',
	'Плохой аппетит',
];

type DiaryEntry = { date: string; text: string };

export default function Diary() {
	const [text, setText] = useState('');
	const [entries, setEntries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getItemJson<DiaryEntry[]>(STORAGE_KEYS.diary, true, []).then((v) => setEntries(v || []));
	}, []);

	async function saveEntry() {
		const entry: DiaryEntry = { date: new Date().toISOString().slice(0, 10), text };
		const next = [entry, ...entries];
		setEntries(next);
		await setItemJson(STORAGE_KEYS.diary, next, true);
		setText('');
	}

	async function exportPdf() {
		const html = `<!doctype html><html><head><meta charset="utf-8"><title>Дневник</title></head><body>${entries
			.map((e) => `<h3>${e.date}</h3><pre>${e.text.replace(/</g, '&lt;')}</pre>`)
			.join('<hr/>')}</body></html>`;
		await exportHtmlToPdfAndShare(html, 'vmeste-diary.pdf');
	}

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
				{templates.map((tpl) => (
					<TouchableOpacity key={tpl} onPress={() => setText((t) => `${t}${t ? '\n' : ''}${tpl}`)} style={{ padding: 8, backgroundColor: '#F3F4F6', borderRadius: 8, margin: 4 }}>
						<Text>{tpl}</Text>
					</TouchableOpacity>
				))}
			</View>
			<TextInput
				placeholder="Запись..."
				value={text}
				onChangeText={setText}
				style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, minHeight: 120 }}
				multiline
			/>
			<View style={{ flexDirection: 'row', marginTop: 12 }}>
				<TouchableOpacity onPress={saveEntry} style={{ padding: 12, backgroundColor: '#DEF7EC', borderRadius: 8, marginRight: 8 }}>
					<Text>Сохранить</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={exportPdf} style={{ padding: 12, backgroundColor: '#E0E7FF', borderRadius: 8 }}>
					<Text>Экспорт в PDF</Text>
				</TouchableOpacity>
			</View>
			{entries.map((e, idx) => (
				<View key={`${e.date}-${idx}`} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}>
					<Text style={{ fontWeight: '600' }}>{e.date}</Text>
					<Text style={{ marginTop: 4 }}>{e.text}</Text>
				</View>
			))}
		</ScrollView>
	);
}