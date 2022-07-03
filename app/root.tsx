import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useFetcher,
	useLoaderData,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import Nav from './components/nav';

import styles from './styles/app.css';
import type { UserData } from './utils/cookies.server';
import { getUserCookie, setUserCookie } from './utils/cookies.server';
import type { Who } from './utils/types';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Bookshelf',
	viewport: 'width=device-width,initial-scale=1',
});

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

function isWho(input: string): input is Who {
	return input === 'chris' || input === 'kate';
}

export default function App() {
	const userData = useLoaderData<UserData>();
	const fetcher = useFetcher();

	const [context, setContext] = useState<UserData>(userData);

	useEffect(() => {
		setContext(userData);
	}, [userData]);

	async function updateUserId(newUserId: string): Promise<void> {
		if (!isWho(newUserId)) return;
		setContext(c => ({ ...c, userId: newUserId }));
		await fetch(`/api/set-user/${newUserId}`);
		fetcher.load('/');
	}

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body>
				<div className="w-full p-8">
					<Nav userId={context.userId} updateUserId={updateUserId} />
					<Outlet context={context} />
				</div>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export const loader: LoaderFunction = async ({ request }) => {
	const cookie = await getUserCookie(request);
	const res = json(cookie);
	if (cookie) {
		res.headers.set('Set-Cookie', await setUserCookie(cookie));
	}

	return res;
};
