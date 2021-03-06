import type { LoaderFunction } from '@remix-run/node';
import type { IBook, Jsonify } from '~/utils/types';

import { useFetcher, useLoaderData, useOutletContext } from '@remix-run/react';
import Books from '~/components/books';
import { json } from '@remix-run/node';
import type { UserData } from '~/utils/cookies.server';
import { getUserCookie } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';
import { useEffect } from 'react';

export interface IBooksData {
	books: Array<IBook>;
}

export const loader: LoaderFunction = async ({ request }) => {
	const userData = await getUserCookie(request);

	if (!userData?.userId || !userData.isAuthenticated) {
		const emptyData: IBooksData = {
			books: [],
		};
		return json(emptyData);
	}

	const data: IBooksData = {
		books: await db.book.findMany({
			select: {
				id: true,
				title: true,
				isOwned: true,
				bookNumber: true,
				users: {
					where: { userId: userData.userId },
					select: {
						userId: true,
						readAt: true,
						readNext: true,
					},
					take: 1,
				},
				author: { select: { id: true, name: true } },
				series: {
					select: {
						name: true,
					},
				},
			},
			orderBy: [
				{
					author: {
						name: 'asc',
					},
				},
				{
					series: {
						name: 'asc',
					},
				},
				{
					bookNumber: 'asc',
				},
			],
		}),
	};

	return json(data);
};

export default function Index() {
	const loaderData = useLoaderData<Jsonify<IBooksData>>();
	const fetcher = useFetcher<Jsonify<IBooksData>>();
	const { userId } = useOutletContext<UserData>();

	useEffect(() => {
		setTimeout(() => {
			fetcher.load('/?index');
		}, 500);
	}, [userId]);

	return (
		<Books
			loaderData={fetcher.data ?? loaderData}
			refetch={() => fetcher.load('/?index')}
		/>
	);
}
