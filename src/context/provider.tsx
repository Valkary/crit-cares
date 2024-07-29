'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import Modal from '~/components/ui/modal';
import { Toaster } from '~/components/ui/toaster';
import AuthContextProvider from '~/context/auth';
import ModalContextProvider from './modal';
import { ThemeProvider } from './theme';

const queryClient = new QueryClient();

export default function AppContextProvider({
	children,
}: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<AuthContextProvider>
					<ModalContextProvider>
						<Modal />
						{children}
					</ModalContextProvider>
					<Toaster />
				</AuthContextProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
