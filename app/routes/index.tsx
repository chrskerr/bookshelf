import type { LoaderFunction } from '@remix-run/node';
import type { IBook } from '~/utils/types';

import { useLoaderData } from '@remix-run/react';
import Books from '~/components/books';
import { json } from '@remix-run/node';
import { getUserIdFromRequest } from '~/utils/cookies.server';
import { db } from '~/utils/db.server';

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
				firstPublishedAt: true,
				users: {
					where: { userId },
					select: {
						readAt: true,
						readingOrder: true,
					},
					take: 1,
				},
				authors: {
					select: {
						author: { select: { id: true, name: true } },
					},
				},
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
	const loaderData = useLoaderData<IBooksData>();

	return <Books loaderData={loaderData} />;
}
