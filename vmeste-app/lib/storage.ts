import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as Random from 'expo-random';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY_ID = 'vmeste.encryption.key';

async function getOrCreateEncryptionKey(): Promise<string> {
	let key = await SecureStore.getItemAsync(ENCRYPTION_KEY_ID);
	if (!key) {
		const bytes = await Random.getRandomBytesAsync(32);
		key = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
		await SecureStore.setItemAsync(ENCRYPTION_KEY_ID, key, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
	}
	return key;
}

export async function setItemJson<T>(key: string, value: T, secure = false): Promise<void> {
	const json = JSON.stringify(value);
	if (secure) {
		const secret = await getOrCreateEncryptionKey();
		const cipher = CryptoJS.AES.encrypt(json, secret).toString();
		await AsyncStorage.setItem(key, cipher);
		return;
	}
	await AsyncStorage.setItem(key, json);
}

export async function getItemJson<T>(key: string, secure = false, fallback: T | null = null): Promise<T | null> {
	const raw = await AsyncStorage.getItem(key);
	if (!raw) return fallback;
	try {
		if (secure) {
			const secret = await getOrCreateEncryptionKey();
			const bytes = CryptoJS.AES.decrypt(raw, secret);
			const json = bytes.toString(CryptoJS.enc.Utf8);
			return JSON.parse(json) as T;
		}
		return JSON.parse(raw) as T;
	} catch (e) {
		return fallback;
	}
}

export async function removeItem(key: string): Promise<void> {
	await AsyncStorage.removeItem(key);
}

export const STORAGE_KEYS = {
	favorites: 'vmeste.favorites',
	diary: 'vmeste.diary',
	planner: 'vmeste.planner',
	settings: 'vmeste.settings',
	emergencyContacts: 'vmeste.emergency',
};