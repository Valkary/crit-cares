'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import { get_user_creds, logout } from '~/data/users/login';
import type { User } from '~/types';

export type UserRole = 'admin' | 'doctor' | 'secretary' | 'readonly';

export type UserContext = {
	user: User | null;
	loginUser: (user: User) => void;
	logoutUser: () => void;
};

export const AuthContext = createContext<UserContext>({
	user: null,
	loginUser: () => {},
	logoutUser: () => {},
});

export default function AuthContextProvider({
	children,
}: { children: ReactNode }) {
	const router = useRouter();
	const path = usePathname();
	const [user, setUser] = useState<User | null>(null);

	async function getUserCreds() {
		const user_creds = await get_user_creds();
		if (!user_creds.success) return null;
		return user_creds.user;
	}

	async function checkUserCreds() {
		if (user !== null) return true;
		const user_req = await getUserCreds();

		setUser(user_req);
		return !!user_req;
	}

	useEffect(() => {
		if (path === '/register') return;

		checkUserCreds().then((is_valid_user) => {
			if (!is_valid_user)
				router.push('/login?toast=error&msg=Usuario no definido');
		});
	}, [path]);

	function loginUser(user: User) {
		setUser(user);
	}

	function logoutUser() {
		setUser(null);
		logout();
	}

	return (
		<AuthContext.Provider value={{ user, loginUser, logoutUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
