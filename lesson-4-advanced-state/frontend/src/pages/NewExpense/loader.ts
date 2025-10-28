import ApiClient from '../../lib/api';
import type { User } from '@/types/User';

export interface LoaderData {
    users: User[];
}

export async function loader(): Promise<LoaderData> {
	const users = await ApiClient.getUsers();
	return { users: users ?? [] };
}
