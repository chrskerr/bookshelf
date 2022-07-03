import type { LoaderFunction } from '@remix-run/node';
import type { IBook, Jsonify } from '~/utils/types';

import { useFetcher, useLoaderData, useOutletContext } from '@remix-run/react';
import Books from '~/components/books';
import { json } from '@remix-run/node';
import { getUserIdFromRequest } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';
import { useEffect } from 'react';

export interface IBooksData {
	books: Array<IBook>;
}

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await getUserIdFromRequest(request);

	if (!userId) {
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
				isbn: true,
				isOwned: true,
				bookNumber: true,
				users: {
					where: { userId },
					select: {
						userId: true,
						readAt: true,
						readingOrder: true,
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
		}),
	};

	return json(data);
};

export default function Index() {
	const loaderData = useLoaderData<Jsonify<IBooksData>>();
	const fetcher = useFetcher<Jsonify<IBooksData>>();
	const { userId } = useOutletContext<{ userId: string | undefined }>();

	useEffect(() => {
		setTimeout(() => {
			fetcher.load('/?index');
		}, 10);
	}, [userId]);

	return (
		<Books
			loaderData={fetcher.data ?? loaderData}
			refetch={() => fetcher.load('/?index')}
		/>
	);
}
