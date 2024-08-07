import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { Suspense } from 'react';
import AppContextProvider from '~/context/provider';

export const metadata = {
	title: 'Create T3 App',
	description: 'Generated by create-t3-app',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<Suspense>
				<body>
					<AppContextProvider>{children}</AppContextProvider>
				</body>
			</Suspense>
		</html>
	);
}
