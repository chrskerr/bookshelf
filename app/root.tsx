import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import Nav from './components/nav';

import styles from './styles/app.css';
import { getUserIdFromRequest } from './utils/cookies.server';
import type { Who } from './utils/types';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'Bookshelf',
	viewport: 'width=device-width,initial-scale=1',
});

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

interface IContext {
	isAuthed: boolean;
	userId: Who | null;
}

function isWho(input: string): input is Who {
	return input === 'chris' || input === 'kate';
}

export default function App() {
	const userId = useLoaderData<Who | null>();

	const [context, setContext] = useState<IContext>({
		isAuthed: false,
		userId: null,
	});

	useEffect(() => {
		setContext(c => ({ ...c, userId }));
	}, [userId]);

	async function updateUserId(newUserId: string): Promise<void> {
		if (!isWho(newUserId)) return;
		setContext(c => ({ ...c, userId: newUserId }));
		await fetch(`/api/set-user/${newUserId}`);
	}

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
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
	return await getUserIdFromRequest(request);
};
