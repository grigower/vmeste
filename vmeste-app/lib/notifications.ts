import * as Notifications from 'expo-notifications';

export async function ensureNotificationPermissions(): Promise<boolean> {
	const { status } = await Notifications.getPermissionsAsync();
	if (status !== 'granted') {
		const { status: newStatus } = await Notifications.requestPermissionsAsync();
		return newStatus === 'granted';
	}
	return true;
}

export async function scheduleReminder(date: Date, title: string, body: string) {
	await ensureNotificationPermissions();
	const trigger: Notifications.NotificationTriggerInput = {
		type: Notifications.SchedulableTriggerInputTypes.DATE,
		date,
	};
	return Notifications.scheduleNotificationAsync({
		content: { title, body },
		trigger,
	});
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
});