import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function exportHtmlToPdfAndShare(html: string, filename = 'vmeste-export.pdf') {
	const { uri } = await Print.printToFileAsync({ html });
	if (await Sharing.isAvailableAsync()) {
		await Sharing.shareAsync(uri, { dialogTitle: filename, UTI: 'com.adobe.pdf' });
	}
	return uri;
}